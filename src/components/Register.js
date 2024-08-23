"use client";
import { useState } from "react";
import styles from '../styles/input.module.css';
import axios from 'axios';
import { useRouter } from "next/navigation";

function Register({ apiUrl }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [alert, setAlert] = useState({ message: '', severity: '' });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name,
            username,
            email,
            password
        };

        try {

            if (password === rePassword) {
                const res = await axios.post(`${apiUrl}/api/register`, postData);

                if (res.data.error) {
                    setAlert({ message: 'Failed to creating user.', severity: 'error' });
                } else {
                    setAlert({ message: 'User created successfully!', severity: 'success' });
                    router.push('/login');
                }

            } else {
                setAlert({ message: 'Password fields must be the same.', severity: 'error' });
            }

        } catch (err) {
            if (err.response.data.message) {
                setAlert({ message: err.response.data.message, severity: 'error' });
                console.log(err)
            } else {
                setAlert({ message: err.response.data, severity: 'error' });
                console.log(err)
            }
        }
    }

    return (
        <div className={`${styles.fields}`}>
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

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    id="email"
                    className={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    className={styles.input}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    id="repassword"
                    className={styles.input}
                    placeholder="Password again"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                <br /><br />

                <div className={styles.singleButtonDiv}>
                    <button className={`${styles.button} ${styles.save}`} type="submit">
                        Register
                    </button>
                </div>

            </form>

        </div>
    )
}

export default Register;