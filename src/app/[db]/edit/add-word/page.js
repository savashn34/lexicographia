import AddWord from "@/components/AddWord";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
import HeaderMain from "@/components/HeaderMain";
import { cache } from 'react';

const fetchMetadata = cache(async (db) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('Authorization')?.value;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${apiUrl}/${db}/add/word`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 403) {
            redirect('/unauthorized');
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db);

    return {
        title: `Add Word | ${data.name} | Lexicographia`,
        description: data.description
    };
}

export default async function Page({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
        return <div>Error: Unauthorized</div>;
    }

    const response = await axios.get(`${apiUrl}/${params.db}/add/word`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = response.data;

    if (data) {
        return (
            <>
                <HeaderMain />
                <AddWord data={data} />
            </>
        )
    } else {
        redirect('/unauthorized');
    }
}