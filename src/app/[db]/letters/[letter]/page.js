import axios from "axios";
import { redirect } from "next/navigation";
import styles from '../../../page.module.css'
import Header from "@/components/Header";
import Link from "next/link";
import PatchLetter from "@/components/patchComponents/PatchLetter";
import { cache } from 'react';

const fetchMetadata = cache(async (db, letter) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/letters/${letter}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            redirect('/404');
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.letter);

    return {
        title: `Words By Letters | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${apiUrl}/${params.db}/letters/${params.letter}`);
    const dictData = res.data.dictionary;
    const wordsByLetter = res.data.words;

    if (wordsByLetter && wordsByLetter.length > 0) {
        return (
            <>
                <Header data={dictData} />

                <div className={`${styles.content}`}>

                    <h4 style={{ fontSize: '2rem' }}>
                        {res.data.total} words found:
                    </h4>
                    <hr />
                    <br />

                    {wordsByLetter.map((word, index) => (

                        <div key={index}>
                            <Link href={`/${params.db}/${word.word}`} className={`${styles.link}`}>
                                <h5 className={`${styles.list}`}>
                                    {word.word}
                                </h5>
                            </Link>
                        </div>

                    ))}
                </div>
            </>
        )
    } else {

        return (
            <>
                <Header data={dictData} />
                <PatchLetter apiUrl={apiUrl} db={params.db} letter={params.letter} />
            </>
        )
    }
}