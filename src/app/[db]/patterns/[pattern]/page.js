import axios from "axios";
import { redirect } from "next/navigation";
import styles from '../../../page.module.css'
import Header from "@/components/Header";
import Link from "next/link";
import PatchPattern from "@/components/patchComponents/PatchPattern";
import { cache } from 'react';

const fetchMetadata = cache(async (db, pattern) => {
    try {
        const apiUrl = process.env.API_URL;

        const response = await axios.get(`${apiUrl}/${db}/patterns/${pattern}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            redirect('/404');
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.pattern);

    return {
        title: `Words By Patterns | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const apiUrl = process.env.API_URL;

    const res = await axios.get(`${apiUrl}/${params.db}/patterns/${params.pattern}`);
    const dictData = res.data.dictionary;
    const wordsByPattern = res.data.words;

    if (wordsByPattern && wordsByPattern.length > 0) {
        return (
            <>
                <Header data={dictData} />

                <div className={`${styles.content}`}>

                    <h4 style={{ fontSize: '2rem' }}>
                        {res.data.total} words found:
                    </h4>
                    <hr />
                    <br />

                    {wordsByPattern.map((word, index) => (

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
                <PatchPattern apiUrl={apiUrl} db={params.db} article={params.pattern} />
            </>
        )
    }
}
