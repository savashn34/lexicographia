import AddDictionary from "@/components/AddDictionary";
import HeaderMain from "@/components/HeaderMain";

export const metadata = {
    title: 'Create Dictionary | Lexicographia',
    description: 'Create a dictionary'
}

export default async function Page() {
    const apiUrl = process.env.API_URL;

    return (
        <>
            <HeaderMain />
            <AddDictionary apiUrl={apiUrl} />
        </>
    )
}