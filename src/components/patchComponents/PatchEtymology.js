"use client";
import axios from "axios";
import { useEffect } from "react";
import styles from '../../app/page.module.css';

function PatchEtymology({ apiUrl, db, etymology }) {
    useEffect(() => {
        const patchFunction = async () => {
            await axios.patch(`${apiUrl}/${db}/etymologies/${etymology}`);
        };

        patchFunction();
    }, [apiUrl, db, etymology]);

    return (
        <div className={`${styles.content}`}>
            <h4 style={{ marginBottom: '2rem' }}>
                This etymology is no longer exists.
            </h4>
        </div>
    )
}

export default PatchEtymology;