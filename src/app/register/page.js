import HeaderMain from "@/components/HeaderMain";
import Register from "@/components/Register";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Register | Lexicographia',
    description: 'Create an account on Lexicographia'
}

export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;

    if (token) {
        redirect('unauthorized');
    }

    return (
        <>
            <HeaderMain />
            <Register />
        </>
    )
}