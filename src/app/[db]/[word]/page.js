import Header from "@/components/Header";
import axios from "axios";
import { notFound } from "next/navigation";
import Word from "@/components/Word";
import { cookies } from 'next/headers'
import { cache } from 'react';

const fetchMetadata = cache(async (db, word) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('Authorization')?.value;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/${word}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err)
        notFound();
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.word);

    return {
        title: `${data.word.word} | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await axios.get(`${apiUrl}/${params.db}/${params.word}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = res.data;
    const dictData = res.data.dictionary;

    return (
        <>
            <Header data={dictData} />
            <Word data={data} />
        </>
    )
}