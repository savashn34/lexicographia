"use client";
import axios from "axios";
import { useEffect } from "react";
import styles from '../../app/page.module.css';

function PatchGender({ apiUrl, db, gender }) {
    useEffect(() => {
        const patchFunction = async () => {
            await axios.patch(`${apiUrl}/${db}/genders/${gender}`);
        };

        patchFunction();
    }, [apiUrl, db, gender]);

    return (
        <div className={`${styles.content}`}>
            <h4 style={{ marginBottom: '2rem' }}>
                This gender is no longer exists.
            </h4>
        </div>
    )
}

export default PatchGender;