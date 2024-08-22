import axios from "axios";
import { redirect } from "next/navigation";
import styles from '../../../page.module.css'
import Header from "@/components/Header";
import Link from "next/link";
import PatchGender from "@/components/patchComponents/PatchGender";
import { cache } from 'react';

const fetchMetadata = cache(async (db, gender) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/genders/${gender}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            redirect('/404');
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.gender);

    return {
        title: `Words By Genders | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${apiUrl}/${params.db}/genders/${params.gender}`);
    const dictData = res.data.dictionary;
    const wordsByGender = res.data.words;

    if (wordsByGender && wordsByGender.length > 0) {
        return (
            <>
                <Header data={dictData} />

                <div className={`${styles.content}`}>

                    <h4 style={{ fontSize: '2rem' }}>
                        {res.data.total} words found:
                    </h4>
                    <hr />
                    <br />

                    {wordsByGender.map((word, index) => (

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
                <PatchGender apiUrl={apiUrl} db={params.db} gender={params.gender} />
            </>
        )
    }
}
