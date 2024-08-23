"use client";
import { useEffect, useRef, useState } from "react";
import styles from '../styles/input.module.css';
import axios from 'axios';

function EditProfile({ data }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [token, setToken] = useState('')
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const alertRef = useRef(null)

    const apiUrl = process.env.API_URL;

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
        setToken(token);

        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [data])

    useEffect(() => {
        if (alert.message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [alert])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setAlert({ message: 'Authorization token is missing. Please log in again.', severity: 'error' });
            return;
        }

        const postData = {
            name,
            username,
            email,
            password
        };

        try {
            if (password === rePassword) {
                const res = await axios.put(`${apiUrl}/profile`, postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.error) {
                    setAlert({ message: 'Failed to editing user.', severity: 'error' });
                } else {
                    setAlert({ message: 'User edited successfully!', severity: 'success' });
                }

            } else {
                setAlert({ message: 'Password fields must be the same.', severity: 'error' });
            }

        } catch (err) {
            setAlert({ message: `An error occurred while editing user: ${err}`, severity: 'error' });
        }
    }

    const handleDelete = async () => {
        if (!token) {
            setAlert({ message: 'Authorization token is missing. Please log in again.', severity: 'error' });
            return;
        }

        try {
            const result = await axios.delete(`${apiUrl}/delete/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (result.data.error) {
                setAlert({ message: 'Failed to delete acoount.', severity: 'error', color: 'red' });
            } else {
                setAlert({ message: 'Account deleted successfully!', severity: 'success', color: 'green' });
                document.cookie = 'Authorization=; Max-Age=0; path=/; secure; SameSite=Strict';
            }
        } catch (error) {
            setAlert({ message: 'Failed to delete account.', severity: 'error', color: 'red' });
        }
    };

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModal(false);
        }
    }

    const [modal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);
    const handleConfirmDelete = () => {
        handleDelete();
        handleClose();
    };

    return (
        <div className={styles.fields} ref={alertRef}>
            {alert.message && (
                <div>
                    {alert.severity === 'success' && (
                        <div className={`${styles.alert} ${styles.alertGreen}`}>
                            {alert.message}
                        </div>
                    )}
                    {alert.severity === 'error' && (
                        <div className={`${styles.alert} ${styles.alertRed}`}>
                            {alert.message}
                        </div>
                    )}
                </div>
            )}

            <br /><br />

            <div className={styles.box}>
                <h4>Name:</h4>

                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.box}>
                <h4>Username:</h4>

                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles.box}>
                <h4>E-mail address:</h4>

                <input
                    type="text"
                    id="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.box}>
                <h4>Password:</h4>

                <input
                    type="password"
                    id="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.box}>
                <h4>Password again:</h4>

                <input
                    type="password"
                    id="repassword"
                    className={styles.input}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
            </div>

            <div className={styles.flexRow}>
                <button className={`${styles.button} ${styles.delete}`} style={{ marginRight: 'auto' }} onClick={handleOpen}>
                    Delete
                </button>

                <button className={`${styles.button} ${styles.save}`} style={{ marginLeft: 'auto' }} onClick={handleSubmit}>
                    Save
                </button>

                {modal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent} ref={modalRef}>
                            <h5 className={styles.modalTitle}>Confirm Delete</h5>
                            <p className={styles.modalDescription}>If you delete your account, all dictionaries you created will be deleted. Are you sure you want to delete your account?</p>
                            <div className={styles.modalButtons}>
                                <button className={`${styles.button} ${styles.cancel}`} onClick={handleClose}>
                                    Cancel
                                </button>
                                <button className={`${styles.button} ${styles.confirm}`} onClick={handleConfirmDelete}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditProfile;