import Link from 'next/link';
import styles from './page.module.css';

export default function RootTemplate({ children }) {
    return (
        <>
            <div>{children}</div>

            <footer className={`${styles.footerContainer}`}>

                <div className={`${styles.footer}`}>
                    <p>
                        Lexicographia
                    </p>

                    <br />

                    <p>
                        2024 &copy; All rights reserved.
                    </p>

                    <br /><br />

                    <div style={{ fontSize: '16px' }}>
                        <Link href={'/'} className={styles.link}>Home</Link> | <Link href={'/terms-of-use'} className={`${styles.link}`}>Terms of use</Link> | <a href={'mailto:lexicographia@protonmail.com'} className={`${styles.link}`}>Contact</a> | <a href='https://github.com/savashn34' className={`${styles.link}`} target="_blank" rel="noopener noreferrer">Github</a>
                    </div>
                </div>
            </footer>
        </>
    )
}