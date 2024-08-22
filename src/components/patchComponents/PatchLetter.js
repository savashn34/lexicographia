"use client";
import axios from "axios";
import { useEffect } from "react";
import styles from '../../app/page.module.css';

function PatchLetter({ apiUrl, db, letter }) {
    useEffect(() => {
        const patchFunction = async () => {
            await axios.patch(`${apiUrl}/${db}/letters/${letter}`);

        };

        patchFunction();
    }, [apiUrl, db, letter]);

    return (
        <div className={`${styles.content}`}>
            <h4 style={{ marginBottom: '2rem' }}>
                This letter is no longer exists.
            </h4>
        </div>
    )
}

export default PatchLetter;