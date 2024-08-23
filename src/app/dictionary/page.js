import HeaderMain from "@/components/HeaderMain";
import axios from "axios";
import { cookies } from 'next/headers'
import Dictionary from "@/components/Dictionary";

export const metadata = {
    title: 'Dictionary | Lexicographia',
    description: 'Your dictionaries on Lexicographia'
}

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;

    const apiUrl = process.env.API_URL;

    if (!token) {
        return <div>Error: Unauthorized</div>;
    }

    const usersDictionary = await axios.get(`${apiUrl}/dictionary`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = usersDictionary.data;

    return (
        <>
            <div>
                <HeaderMain />
            </div>
            <div>
                <Dictionary data={data} />
            </div>
        </>
    )
}