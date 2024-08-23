import EditProfile from "@/components/EditProfile";
import HeaderMain from "@/components/HeaderMain";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
import { cookies } from 'next/headers'

export const metadata = {
    title: 'Profile | Lexicographia',
    description: 'Your Lexicographia profie'
}

export default async function Page() {
    const apiUrl = process.env.API_URL;

    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;

    if (!token) {
        redirect('/unauthorized');
    }

    try {
        const response = await axios.get(`${apiUrl}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response) {
            const data = response.data;

            return (
                <>
                    <HeaderMain />
                    <EditProfile data={data} apiUrl={apiUrl} />
                </>
            )
        } else if (response.err && response.err.status === 404) {
            notFound();
        }

    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 403) {
            redirect('/unauthorized');
        } else if (err.response && err.response.status === 404) {
            notFound();
        }
    }
}