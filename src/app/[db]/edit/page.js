import axios from "axios";
import { cookies } from 'next/headers'
import EditDictionary from "@/components/EditDictionary";
import { redirect } from "next/navigation";
import HeaderMain from "@/components/HeaderMain";
import { cache } from 'react';

const fetchMetadata = cache(async (db) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('Authorization')?.value;
        const apiUrl = process.env.API_URL;

        const response = await axios.get(`${apiUrl}/${db}/edit`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 403) {
            redirect('/unauthorized');
        } else if (err.response && err.response.status === 404) {
            notFound();
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db);

    return {
        title: `Edit ${data.name} | Lexicographia`,
        description: data.description
    };
}

export default async function Page({ params }) {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;
    const apiUrl = process.env.API_URL;

    if (!token) {
        redirect('/unauthorized');
    }

    const response = await axios.get(`${apiUrl}/${params.db}/edit`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = response.data;

    return (
        <div>
            <HeaderMain />
            <EditDictionary data={data} apiUrl={apiUrl} />
        </div>
    )
}