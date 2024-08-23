"use client";
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/input.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function EditDictionary({ data }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [sources, setSources] = useState(['']);
    const [contact, setContact] = useState('');
    const [definitions, setDefinitions] = useState(false);
    const [equivalents, setEquivalents] = useState(false);
    const [articles, setArticles] = useState(false);
    const [genders, setGenders] = useState(false);
    const [examples, setExamples] = useState(false);
    const [terminologies, setTerminologies] = useState(false);
    const [pos, setPos] = useState(false);
    const [etymologies, setEtymologies] = useState(false);
    const [spellings, setSpellings] = useState(false);
    const [explanations, setExplanations] = useState(false);
    const [roots, setRoots] = useState(false);
    const [patterns, setPatterns] = useState(false);

    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [token, setToken] = useState('');

    const alertRef = useRef(null)

    const router = useRouter();

    const apiUrl = process.env.API_URL;

    useEffect(() => {
        setName(data.name || '');
        setUrl(data.url || '');
        setDescription(data.description || '');
        setContact(data.contact || '');
        setSources(data.sources || '');
        setDefinitions(data.fields.definitions || false);
        setEquivalents(data.fields.equivalents || false);
        setArticles(data.fields.articles || false);
        setGenders(data.fields.genders || false);
        setExamples(data.fields.examples || false);
        setTerminologies(data.fields.terminologies || false);
        setPos(data.fields.pos || false);
        setEtymologies(data.fields.etymologies || false);
        setSpellings(data.fields.spellings || false);
        setExplanations(data.fields.explanations || false);
        setRoots(data.fields.roots || false);
        setPatterns(data.fields.patterns || false);

        const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
        setToken(token);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [data]);

    useEffect(() => {
        if (alert.message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [alert])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name,
            url,
            description,
            contact,
            sources,
            definitions,
            equivalents,
            articles,
            genders,
            examples,
            terminologies,
            pos,
            etymologies,
            spellings,
            explanations,
            roots,
            patterns
        }

        try {
            const res = await axios.put(`${apiUrl}/${data.url}/edit`, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.error) {
                setAlert({ message: 'Failed to editing the dictionary.', severity: 'error' });
            } else {
                setAlert({ message: 'The dictionary edited successfully!', severity: 'success' });
                router.push('/dictionary');
            }
        } catch (err) {
            console.log(err);
            setAlert({ message: 'An error occurred while editing the dictionary.', severity: 'error' });
        }
    }

    const handleDelete = async () => {
        try {
            const result = await axios.delete(`${apiUrl}/${data.url}/delete/dictionary`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (result.data.error) {
                setAlert({ message: 'Failed to deleting dictionary.', severity: 'error', color: 'red' });
            } else {
                setAlert({ message: 'Dictionary deleted successfully!', severity: 'success', color: 'green' });
            }
        } catch (error) {
            setAlert({ message: 'Failed to deleting dictionary.', severity: 'error', color: 'red' });
            console.log(error);
        }
    };

    const addSource = async (e) => {
        e.preventDefault();
        setSources([...sources, ''])
    }

    const sourceChange = (index, value) => {
        const newSources = [...sources];
        newSources[index] = value;
        setSources(newSources);
    };

    const removeSource = () => {
        if (sources.length > 1) {
            setSources(sources.slice(0, -1));
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

            <div className={styles.box}>
                <h4>Dictionary Name:</h4>

                <input
                    type="text"
                    id="name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <div className={styles.box}>
                <h4>Dictionary URL</h4>

                <input
                    type="text"
                    id="url"
                    className={styles.input}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

            </div>

            <div className={styles.box}>
                <h4>Contact E-Mail For Dictionary</h4>

                <input
                    type="text"
                    id="contact"
                    className={styles.input}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

            </div>

            <div className={styles.box}>
                <h4>Dictionary Description</h4>

                <textarea
                    type="text"
                    id="description"
                    className={`${styles.input} ${styles.textarea}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className={styles.box}>
                <h4>Dictionary Sources</h4>

                {sources.map((source, index) => (
                    <input
                        key={index}
                        type="text"
                        id={`source-${index}`}
                        className={styles.input}
                        placeholder="Source"
                        value={source}
                        onChange={(e) => sourceChange(index, e.target.value)}
                    />
                ))}

                <div className={styles.flexRow} style={{ marginTop: '1rem' }}>

                    <button className={`${styles.button} ${styles.delete}`} style={{ marginRight: 'auto', width: '10rem' }} onClick={removeSource}>
                        Remove a source
                    </button>

                    <button className={`${styles.button} ${styles.save}`} style={{ marginLeft: 'auto', width: '10rem' }} onClick={addSource}>
                        Add a source
                    </button>

                </div>
            </div>

            <p style={{ marginTop: '50px', marginBottom: '25px', fontSize: '21px' }}>
                Select what your dictionary needs:
            </p>

            <div className={styles.formGroup}>

                <div className={styles.groupLeft}>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={definitions}
                            onChange={() => setDefinitions(!definitions)}
                        />
                        Definitions
                    </label>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={articles}
                            onChange={() => setArticles(!articles)}
                        />
                        Articles
                    </label>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={examples}
                            onChange={() => setExamples(!examples)}
                        />
                        Examples
                    </label>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={pos}
                            onChange={() => setPos(!pos)}
                        />
                        Parts of speech
                    </label>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={spellings}
                            onChange={() => setSpellings(!spellings)}
                        />
                        Spellings
                    </label>

                    <label className={styles.formLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={roots}
                            onChange={() => setRoots(!roots)}
                        />
                        Roots
                    </label>

                </div>

                <div className={styles.groupRight}>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={equivalents}
                            onChange={() => setEquivalents(!equivalents)}
                        />
                        Equivalents
                    </label>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={genders}
                            onChange={() => setGenders(!genders)}
                        />
                        Genders
                    </label>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={terminologies}
                            onChange={() => setTerminologies(!terminologies)}
                        />
                        Terminologies
                    </label>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={etymologies}
                            onChange={() => setEtymologies(!etymologies)}
                        />
                        Etymologies
                    </label>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={explanations}
                            onChange={() => setExplanations(!explanations)}
                        />
                        Explanations
                    </label>

                    <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={patterns}
                            onChange={() => setPatterns(!patterns)}
                        />
                        Patterns
                    </label>

                </div>

            </div>

            <br />
            <hr />
            <br /><br />

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
                            <p className={styles.modalDescription}>Are you sure you want to delete this dictionary?</p>
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

        </div >
    )
}

export default EditDictionary;