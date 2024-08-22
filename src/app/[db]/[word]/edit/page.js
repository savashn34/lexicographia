import axios from "axios";
import EditWord from "@/components/EditWord";
import { cookies } from 'next/headers'
import { notFound, redirect } from "next/navigation";
import HeaderMain from "@/components/HeaderMain";
import { cache } from 'react';

const fetchMetadata = cache(async (db, word) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('Authorization')?.value;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/${word}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 403) {
            return redirect('/unauthorized');
        } else if (err.response && err.response.status === 404) {
            return notFound();
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db, params.word);

    return {
        title: `Edit ${data.word.word} | ${data.dictionary.name} | Lexicographia`,
        description: data.dictionary.description
    };
}

export default async function Page({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
        return redirect('/unauthorized');
    }

    const response = await axios.get(`${apiUrl}/${params.db}/${params.word}/edit`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = response.data;

    return (
        <div>
            <HeaderMain />
            <EditWord data={data} />
        </div>
    )
}