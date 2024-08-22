"use client";
import axios from "axios";
import { useEffect } from "react";
import styles from '../../app/page.module.css';

function PatchPattern({ apiUrl, db, pattern }) {
    useEffect(() => {
        const patchFunction = async () => {
            await axios.patch(`${apiUrl}/${db}/patterns/${pattern}`);
        };

        patchFunction();
    }, [apiUrl, db, pattern]);

    return (
        <div className={`${styles.content}`}>
            <h4 style={{ marginBottom: '2rem' }}>
                This pattern is no longer exists.
            </h4>
        </div>
    )
}

export default PatchPattern;