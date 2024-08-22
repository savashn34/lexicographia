"use client";
import styles from '../styles/list.module.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Dictionary({ data }) {
    const router = useRouter();

    const handleAddRedirect = () => {
        router.push('/dictionary/add');
    }

    return (
        <>
            <div className={styles.box}>
                <button
                    className={styles.button}
                    onClick={handleAddRedirect}
                >
                    <p>Create a new dictionary</p>
                </button>
            </div>

            <br />

            <div className={styles.content}>
                <h4 style={{ fontSize: '40px' }}>
                    My dictionaries:
                </h4>
                <hr />
                <br />

                <div className={styles.table}>

                    <table>
                        <tbody>
                            {data.map((dict, index) => (
                                <tr key={index}>
                                    <th>
                                        <Link href={dict.url} className={styles.link}>
                                            {dict.name}
                                        </Link>
                                    </th>
                                    <th>
                                        <Link href={`${dict.url}/edit`} className={styles.link}>
                                            Edit
                                        </Link>
                                    </th>
                                    <th>
                                        <Link href={`${dict.url}/edit/add-word`} className={styles.link}>
                                            Add word
                                        </Link>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div >
        </>
    );
}

export default Dictionary;