"use client";
import axios from "axios";
import { useEffect } from "react";
import styles from '../../app/page.module.css';

function PatchArticle({ apiUrl, db, article }) {
    useEffect(() => {
        const patchFunction = async () => {
            await axios.patch(`${apiUrl}/${db}/articles/${article}`);
        };

        patchFunction();
    }, [apiUrl, db, article]);

    return (
        <div className={`${styles.content}`}>
            <h4 style={{ marginBottom: '2rem' }}>
                This article is no longer exists.
            </h4>
        </div>
    )
}

export default PatchArticle;