import styles from '../page.module.css'
import HeaderMain from "@/components/HeaderMain";

export const metadata = {
    title: 'Unauthorized | Lexicographia',
    description: 'You are not allowed to see this page.'
}

export default async function Page() {
    return (
        <>
            <HeaderMain />
            <div className={styles.content}>
                <h3 style={{ marginBottom: '100px' }}>
                    You are not allowed to see this page.
                </h3>
            </div>
        </>
    )
}