import HeaderMain from "@/components/HeaderMain";
import Login from "@/components/Login";

export const metadata = {
    title: 'Login | Lexicographia',
    description: 'Log in Lexicographia'
}

export default async function Page() {
    const apiUrl = process.env.API_URL;
    return (
        <>
            <HeaderMain />
            <Login apiUrl={apiUrl} />
        </>
    )
}