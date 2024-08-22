import Header from "@/components/Header";
import styles from "../page.module.css";
import axios from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from 'react';

const fetchMetadata = cache(async (db) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/${db}`);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            notFound();
        }
    }
});

export async function generateMetadata({ params }) {
    const data = await fetchMetadata(params.db)

    if (!data.isDeleted) {
        return {
            title: `${data.name} | Lexicographia`,
            description: data.description
        }
    } else {
        notFound();
    }
}

export default async function Page({ params }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${apiUrl}/${params.db}`);

    if (response) {
        const data = response.data;

        return (
            <div>
                <div>
                    <Header data={data} />
                </div>
                <div className={`${styles.content}`}>
                    <p>
                        There are {data.total} words in this dictionary. Last updated on {data.updatedAt.split('T')[0]}
                    </p>

                    <br /><br />

                    {data.description}

                    <br /><br />

                    <p>
                        Created by {data.admin.name} ({data.admin.username}) on {data.createdAt.split('T')[0]}.
                    </p>
                    <p>
                        Contact: {data.contact}
                    </p>

                    {data.filters && (
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <h5 style={{ fontSize: '2rem' }}>Filter</h5>

                                <hr />

                                <div className={styles.filterContent}>
                                    {data.filters.genders && (
                                        <div>
                                            <h6 style={{ fontSize: '1.2rem' }}>
                                                Genders:
                                            </h6>
                                            {data.filters.genders.sort().map((gender, index) => (
                                                <div key={index}>

                                                    <ul className={styles.list}>
                                                        <li>
                                                            <Link href={`${data.url}/genders/${gender}`} className={styles.link} style={{ fontSize: '1rem' }}>
                                                                {gender}
                                                            </Link>
                                                        </li>

                                                    </ul>
                                                </div>
                                            ))}
                                            <br />
                                        </div>
                                    )}

                                    {data.filters.etymologies && (
                                        <div>
                                            <h6 style={{ fontSize: '1.2rem' }}>
                                                Etymologies:
                                            </h6>
                                            {data.filters.etymologies.sort().map((etymology, index) => (
                                                <div key={index}>
                                                    <ul className={styles.list}>
                                                        <li>
                                                            <Link href={`${data.url}/etymologies/${etymology}`} className={styles.link} style={{ fontSize: '1rem' }}>
                                                                {etymology}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                            <br />
                                        </div>
                                    )}

                                    {data.filters.articles && (
                                        <div>
                                            <h6 style={{ fontSize: '1.2rem' }}>
                                                Articles:
                                            </h6>
                                            {data.filters.articles.sort().map((article, index) => (
                                                <div key={index}>
                                                    <ul className={styles.list}>
                                                        <li>
                                                            <Link href={`${data.url}/articles/${article}`} className={styles.link} style={{ fontSize: '1rem' }}>
                                                                {article}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                            <br />
                                        </div>
                                    )}

                                    {data.filters.patterns && (
                                        <div>
                                            <h6 style={{ fontSize: '1.2rem' }}>
                                                Patterns:
                                            </h6>
                                            {data.filters.patterns.sort().map((pattern, index) => (
                                                <div key={index}>
                                                    <ul className={styles.list}>
                                                        <li>
                                                            <Link href={`${data.url}/patterns/${pattern}`} className={styles.link} style={{ fontSize: '1rem' }}>
                                                                {pattern}
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                            <br />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    )}

                    {data.sources && (
                        <>
                            <div className={styles.flexColumn}>
                                <h6 style={{ fontSize: '2rem' }}>Sources:</h6>
                                <br />
                                <ul>
                                    {data.sources.map((source, index) => (
                                        <li key={index}>
                                            {source}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                </div>
            </div>
        );
    }

}