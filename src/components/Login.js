"use client";
import { useState } from "react";
import styles from '../styles/input.module.css';
import axios from 'axios';
import { useRouter } from "next/navigation";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState({ message: '', severity: '' });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            username,
            password
        };

        try {

            const apiUrl = process.env.API_URL;

            const res = await axios.post(`${apiUrl}/login`, postData);

            if (res.status === 200 && res.data.token) {
                setAlert({ message: 'User logged in successfully!', severity: 'success' });
                document.cookie = `Authorization=${res.data.token}; max-age=86400`;
                router.push('/');
            } else {
                setAlert({ message: 'Failed to login.', severity: 'error' });
                console.log(err)
            }

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setAlert({ message: err.response.data.message || 'Invalid username or password.', severity: 'error' });
                console.log(err)
            } else {
                setAlert({ message: 'An error occurred while logging in.', severity: 'error' });
                console.log(err)
            }
        }
    }

    return (
        <div className={styles.fields}>
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

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    placeholder="Username or E-mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    className={styles.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.singleButtonDiv}>
                    <button type="submit" className={`${styles.button} ${styles.save}`}>
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Login;