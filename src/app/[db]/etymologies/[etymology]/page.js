import axios from "axios";
import { redirect } from "next/navigation";
import styles from '../../../page.module.css'
import Header from "@/components/Header";
import Link from "next/link";
import PatchEtymology from "@/components/patchComponents/PatchEtymology";
import { cache } from 'react';

const fetchMetadata = cache(async (db, etymology) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/etymologies/${etymology}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            redirect('/404');
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.article);

    return {
        title: `Words By Etymologies | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${apiUrl}/${params.db}/etymologies/${params.etymology}`);
    const dictData = res.data.dictionary;
    const wordsByEtymology = res.data.words;

    if (wordsByEtymology && wordsByEtymology.length > 0) {
        return (
            <>
                <Header data={dictData} />

                <div className={`${styles.content}`}>

                    <h4 style={{ fontSize: '2rem' }}>
                        {res.data.total} words found:
                    </h4>
                    <hr />
                    <br />

                    {wordsByEtymology.map((word, index) => (

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
                <PatchEtymology apiUrl={apiUrl} db={params.db} etymology={params.etymology} />
            </>
        )
    }
}
