"use client";
import { useState, useEffect, useRef } from "react";
import styles from '../styles/input.module.css';
import stylesword from '../styles/wordcard.module.css';
import axios from 'axios';
import { useRouter } from "next/navigation";

function AddDictionary() {
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

    const [token, setToken] = useState('');
    const [alert, setAlert] = useState('');

    const alertRef = useRef(null)

    const router = useRouter();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
        setToken(token);
    }, []);

    useEffect(() => {
        if (alert.message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await axios.post(`${apiUrl}/create-dictionary`, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.error) {
                setAlert({ message: 'Failed to creating the dictionary.', severity: 'error' });
            } else {
                setAlert({ message: 'The dictionary created successfully!', severity: 'success' });
                router.push('/dictionary');
            }
        } catch (err) {
            setAlert({ message: 'An error occurred while creating the dictionary.', severity: 'error' });
        }
    }

    const addSource = async (e) => {
        e.preventDefault();
        setSources([...sources, ''])
    }

    const handleSourceChange = (index, value) => {
        const newSources = [...sources];
        newSources[index] = value;
        setSources(newSources);
    };

    return (
        <div className={styles.fields} ref={alertRef}>
            <h4 style={{ fontSize: '40px', marginBottom: '6%' }}>
                Create a new dictionary:
            </h4>
            <hr />

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
                            onChange={(e) => handleSourceChange(index, e.target.value)}
                        />
                    ))}
                    <button className={`${styles.button} ${styles.save}`} style={{ marginLeft: 'auto', width: '10rem' }} onClick={addSource}>
                        Add a new source
                    </button>
                </div>

                <p style={{ marginTop: '50px', marginBottom: '25px', fontSize: '21px' }}>
                    Select what your dictionary needs:
                </p>

                <div className={styles.formGroup}>

                    <div className={styles.groupLeft}>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="definitions"
                                className={styles.checkbox}
                                checked={definitions}
                                onChange={() => setDefinitions(!definitions)}
                            />
                            Definitions
                        </label>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="articles"
                                className={styles.checkbox}
                                checked={articles}
                                onChange={() => setArticles(!articles)}
                            />
                            Articles
                        </label>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="examples"
                                className={styles.checkbox}
                                checked={examples}
                                onChange={() => setExamples(!examples)}
                            />
                            Examples
                        </label>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="pos"
                                className={styles.checkbox}
                                checked={pos}
                                onChange={() => setPos(!pos)}
                            />
                            Parts of speech
                        </label>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="spellings"
                                className={styles.checkbox}
                                checked={spellings}
                                onChange={() => setSpellings(!spellings)}
                            />
                            Spellings
                        </label>

                        <label className={styles.formLabel}>
                            <input
                                type="checkbox"
                                id="roots"
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
                                id="equivalents"
                                className={styles.checkbox}
                                checked={equivalents}
                                onChange={() => setEquivalents(!equivalents)}
                            />
                            Equivalents
                        </label>

                        <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                            <input
                                type="checkbox"
                                id="genders"
                                className={styles.checkbox}
                                checked={genders}
                                onChange={() => setGenders(!genders)}
                            />
                            Genders
                        </label>

                        <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                            <input
                                type="checkbox"
                                id="terminologies"
                                className={styles.checkbox}
                                checked={terminologies}
                                onChange={() => setTerminologies(!terminologies)}
                            />
                            Terminologies
                        </label>

                        <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                            <input
                                type="checkbox"
                                id="etymologies"
                                className={styles.checkbox}
                                checked={etymologies}
                                onChange={() => setEtymologies(!etymologies)}
                            />
                            Etymologies
                        </label>

                        <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                            <input
                                type="checkbox"
                                id="explanations"
                                className={styles.checkbox}
                                checked={explanations}
                                onChange={() => setExplanations(!explanations)}
                            />
                            Explanations
                        </label>

                        <label className={styles.formLabel} style={{ marginLeft: 'auto' }}>
                            <input
                                type="checkbox"
                                id="patterns"
                                className={styles.checkbox}
                                checked={patterns}
                                onChange={() => setPatterns(!patterns)}
                            />
                            Patterns
                        </label>

                    </div>

                </div>

                <br />
                <p style={{ marginTop: '50px', marginBottom: '25px', fontSize: '21px' }}>Preview of an example word of your dictionary:</p>

                <div className={stylesword.content} style={{ padding: 0 }}>
                    <div className={stylesword.container}>
                        <div className={stylesword.card}>
                            <div className={stylesword.cardContent}>

                                <div className={stylesword.headContainer}>

                                    <h5 className={stylesword.wordTitle}>
                                        word
                                    </h5>

                                    {(etymologies || spellings) && (
                                        <p className={stylesword.wordInfo}>
                                            {(etymologies && spellings) ? (
                                                <span>Etymology spelling</span>
                                            ) : (
                                                <>
                                                    {etymologies ? <span>etymology</span> : ''}
                                                    {spellings ? <span>spelling</span> : ''}
                                                </>
                                            )}
                                        </p>
                                    )}

                                    {(articles || genders || patterns || roots) && (
                                        <p className={stylesword.wordInfo}>
                                            {[articles && 'article', genders && 'gender', patterns && 'pattern', roots && 'root']
                                                .filter(Boolean)
                                                .map((item, index, array) => (
                                                    <span key={`${item}-${index}`}>
                                                        {item}
                                                        {index < array.length - 1 && ', '}
                                                    </span>
                                                ))}
                                        </p>
                                    )}

                                    {(equivalents || genders || articles || pos || terminologies) && !definitions && (
                                        <div className={stylesword.definitions}>
                                            <p className={stylesword.definition}>
                                                <span style={{ fontWeight: 'bold' }}>1. </span>

                                                {[genders && <em className={stylesword.adverb}>gender</em>,
                                                articles && <em className={stylesword.adverb}>article</em>,
                                                pos && <em className={stylesword.adverb}>part of speech</em>,
                                                terminologies && <em className={stylesword.adverb}>terminology</em>,
                                                equivalents && 'equivalent']
                                                    .filter(Boolean)
                                                    .map((item, index, array) => (
                                                        <span key={`${item}-${index}`}>
                                                            {item}
                                                            {index < array.length - 1 && ', '}
                                                        </span>
                                                    ))
                                                }

                                            </p>

                                            {examples && (
                                                <p className={stylesword.example}>"Example of the equivalent."</p>
                                            )}
                                        </div>
                                    )}

                                    {(definitions || pos || terminologies) && !equivalents && (
                                        <div className={stylesword.definitions}>
                                            <p className={stylesword.definition}>
                                                <span style={{ fontWeight: 'bold' }}>1. </span>

                                                {[pos && <em className={stylesword.adverb}>part of speech</em>,
                                                terminologies && <em className={stylesword.adverb}>terminology</em>,
                                                definitions && 'Definition']
                                                    .filter(Boolean)
                                                    .map((item, index, array) => (
                                                        <span key={`${item}-${index}`}>
                                                            {item}
                                                            {index < array.length - 1 && ', '}
                                                        </span>
                                                    ))
                                                }

                                            </p>

                                            {examples && (
                                                <p className={stylesword.example}>"Example of the definition."</p>
                                            )}
                                        </div>
                                    )}

                                    {(definitions && equivalents) && (
                                        <>
                                            <div className={stylesword.definitions}>
                                                <p className={stylesword.definition}>
                                                    <span style={{ fontWeight: 'bold' }}>1. </span>

                                                    {[pos && <em className={stylesword.adverb}>part of speech</em>,
                                                    terminologies && <em className={stylesword.adverb}>terminology</em>,
                                                    definitions && 'Definition']
                                                        .filter(Boolean)
                                                        .map((item, index, array) => (
                                                            <span key={`${item}-${index}`}>
                                                                {item}
                                                                {index < array.length - 1 && ', '}
                                                            </span>
                                                        ))
                                                    }

                                                </p>

                                                {examples && (
                                                    <p className={stylesword.example}>"Example of the definition."</p>
                                                )}
                                            </div>

                                            <hr />

                                            <div className={stylesword.equivalents}>
                                                {[equivalents && 'equivalent', articles && <em style={{ fontStyle: 'italic' }}> (article)</em>]}
                                            </div>
                                        </>
                                    )}

                                    {explanations && (
                                        <>
                                            <hr />
                                            <br />
                                            This is the extra explanation for the example word.
                                            <br />
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <hr />
                <br /><br />

                <div className={styles.flexRow}>
                    <button className={`${styles.button} ${styles.save}`} style={{ marginLeft: 'auto' }} type="submit">
                        Create
                    </button>
                </div>

            </form>
        </div >
    )
}

export default AddDictionary;