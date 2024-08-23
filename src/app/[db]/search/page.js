import Header from "@/components/Header";
import axios from "axios";
import styles from "../../../styles/list.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
    title: 'Search | Lexicographia',
    description: 'Lexicograhia is an open source web application that allows lexicographers to create and publish their own dictionaries. It focused on to give all the tools that a lexicographer may need, while saving its simplicity and ease of use.'
}

export default async function SearchPage({ params, searchParams }) {
    const searchTerm = searchParams.word || '';
    const apiUrl = process.env.API_URL;

    const results = await axios.get(`${apiUrl}/${params.db}/search`, {
        params: { word: searchTerm }
    });

    const header = results.data.dictionary;
    const words = results.data.search;

    if (results) {
        return (
            <>
                <Header data={header} />
                <div className={styles.content}>

                    <div className={styles.list}>
                        {words.map((word, index) => (
                            <div key={index}>
                                <Link href={word.word} className={styles.link}>
                                    {word.word}
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </>
        )
    } else {
        notFound();
    }

}