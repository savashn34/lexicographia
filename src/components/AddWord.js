"use client";
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/input.module.css';
import axios from 'axios';

import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

function AddWord({ data }) {
    const [word, setWord] = useState('');
    const [etymology, setEtymology] = useState('');
    const [explanation, setExplanation] = useState('');
    const [article, setArticle] = useState('');
    const [gender, setGender] = useState('');
    const [spelling, setSpelling] = useState('');
    const [root, setRoot] = useState('');
    const [pattern, setPattern] = useState('');

    const [token, setToken] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' });

    const [defField, setDefField] = useState([{ definition: '', pos: '', terminology: '', example: '' }]);
    const [eqField, setEqField] = useState([{ equivalent: '', article: '', gender: '', pos: '', example: '' }]);

    const eqFieldRefs = useRef([]);
    const defFieldRefs = useRef([])
    const alertRef = useRef(null)
    const [isEqFieldAdded, setIsEqFieldAdded] = useState(false);
    const [isDefFieldAdded, setIsDefFieldAdded] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1];
        setToken(token);
    }, []);

    useEffect(() => {
        if (isEqFieldAdded && eqFieldRefs.current.length > 0) {
            const lastElementRef = eqFieldRefs.current[eqFieldRefs.current.length - 1];
            lastElementRef?.scrollIntoView({ behavior: 'smooth' });
            setIsEqFieldAdded(false);
        }

        if (isDefFieldAdded && defFieldRefs.current.length > 0) {
            const lastElementRef = defFieldRefs.current[defFieldRefs.current.length - 1];
            lastElementRef?.scrollIntoView({ behavior: 'smooth' });
            setIsDefFieldAdded(false);
        }

        if (alert.message && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isEqFieldAdded, isDefFieldAdded, alert]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            word,
            etymology,
            spelling,
            explanation,
            article,
            gender,
            root,
            pattern,
            equivalents: [
                ...eqField.map(field => ({
                    equivalent: field.equivalent && field.equivalent !== '' ? field.equivalent : undefined,
                    article: field.article && field.article !== '' ? field.article : undefined,
                    gender: field.gender && field.gender !== '' ? field.gender : undefined,
                    example: field.example && field.example !== '' ? field.example : undefined,
                    terminology: field.terminology && field.terminology !== '' ? field.terminology : undefined,
                    pos: field.pos && field.pos !== '' ? field.pos : undefined
                }))
            ],
            definitions: [
                ...defField.map(field => ({
                    definition: field.definition && field.definition !== '' ? field.definition : undefined,
                    terminology: field.terminology && field.terminology !== '' ? field.terminology : undefined,
                    pos: field.pos && field.pos !== '' ? field.pos : undefined,
                    example: field.example && field.example !== '' ? field.example : undefined,
                }))
            ]
        };

        const apiUrl = process.env.API_URL;

        try {
            const res = await axios.post(`${apiUrl}/${data.url}/add/word`, postData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (res.data.error) {
                setAlert({ message: 'Failed to add the word.', severity: 'error' });
            } else {
                setAlert({ message: 'Word added successfully!', severity: 'success' });
            }

        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'An unknown error occurred';
            setAlert({ message: `${errorMessage}`, severity: 'error' });
        }
    };

    const handleAddEqField = () => {
        setEqField([...eqField, { equivalent: '', article: '', gender: '', pos: '', example: '' }]);
        setIsEqFieldAdded(true);
    };

    const handleRemoveEqField = (index) => {
        const fields = [...eqField];
        fields.splice(index, 1);
        setEqField(fields);
    };

    const handleChangeEqField = (index, field, value) => {
        const fields = [...eqField];
        fields[index][field] = value;
        setEqField(fields);
    };

    const handleAddDefField = () => {
        setDefField([...defField, { definition: '', pos: '', terminology: '', example: '' }]);
        setIsDefFieldAdded(true);
    };

    const handleRemoveDefField = (index) => {
        const fields = [...defField];
        fields.splice(index, 1);
        setDefField(fields);
    };

    const handleChangeDefField = (index, field, value) => {
        const fields = [...defField];
        fields[index][field] = value;
        setDefField(fields)
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

            <form onSubmit={handleSubmit}>

                <div className={styles.box}>

                    <h4>Word:</h4>

                    <input
                        type="text"
                        id="word"
                        className={styles.input}
                        placeholder="Word"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                </div>

                {data.fields.articles && (
                    <div className={styles.box}>

                        <h4>Article</h4>

                        <input
                            type="text"
                            id="article"
                            className={styles.input}
                            placeholder="Article"
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.genders && (
                    <div className={styles.box}>

                        <h4>Gender:</h4>

                        <input
                            type="text"
                            id="gender"
                            className={styles.input}
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.roots && (
                    <div className={styles.box}>

                        <h4>Root:</h4>

                        <input
                            type="text"
                            id="root"
                            className={styles.input}
                            placeholder="Root"
                            value={root}
                            onChange={(e) => setRoot(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.patterns && (
                    <div className={styles.box}>

                        <h4>Pattern:</h4>

                        <input
                            type="text"
                            id="pattern"
                            className={styles.input}
                            placeholder="Pattern"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.etymologies && (
                    <div className={styles.box}>

                        <h4>Etymology:</h4>

                        <input
                            type="text"
                            id="etymology"
                            className={styles.input}
                            placeholder="Etymology"
                            value={etymology}
                            onChange={(e) => setEtymology(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.spellings && (
                    <div className={styles.box}>

                        <h4>Spelling:</h4>

                        <input
                            type="text"
                            id="spelling"
                            className={styles.input}
                            placeholder="Spelling"
                            value={spelling}
                            onChange={(e) => setSpelling(e.target.value)}
                        />
                    </div>
                )}

                {data.fields.equivalents && !data.fields.definitions && (
                    eqField.map((field, index) => (
                        <div key={`eq-${index}`} className={styles.box} ref={el => eqFieldRefs.current[index] = el}>

                            <div className={styles.headField}>
                                {index + 1}. Equivalents Field

                                <div className={styles.icons}>
                                    <MdDeleteForever className={styles.iconDelete} onClick={() => handleRemoveEqField(index)} />
                                    <IoIosAddCircle className={styles.iconAdd} onClick={handleAddEqField} />
                                </div>

                            </div>

                            <h5>Equivalent:</h5>
                            <input
                                type="text"
                                id={`equivalent-${index}`}
                                className={styles.input}
                                placeholder="Equivalent"
                                value={field.equivalent ? field.equivalent : ''}
                                onChange={(e) => handleChangeEqField(index, 'equivalent', e.target.value)}
                            />

                            {data.fields.articles && (
                                <>
                                    <h5>Article:</h5>
                                    <input
                                        type="text"
                                        id={`article-${index}`}
                                        className={styles.input}
                                        placeholder="Article"
                                        value={field.article ? field.article : ''}
                                        onChange={(e) => handleChangeEqField(index, 'article', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.genders && (
                                <>
                                    <h5>Gender:</h5>
                                    <input
                                        type="text"
                                        id={`gender-${index}`}
                                        className={styles.input}
                                        placeholder="Gender"
                                        value={field.gender ? field.gender : ''}
                                        onChange={(e) => handleChangeEqField(index, 'gender', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.terminologies && (
                                <>
                                    <h5>Terminology:</h5>
                                    <input
                                        type="text"
                                        id={`terminology-${index}`}
                                        className={styles.input}
                                        placeholder="Terminology of the equivalent"
                                        value={field.terminology ? field.terminology : ''}
                                        onChange={(e) => handleChangeEqField(index, 'terminology', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.pos && (
                                <>
                                    <h5>Part of speech:</h5>
                                    <input
                                        type="text"
                                        id={`pos-${index}`}
                                        className={styles.input}
                                        placeholder="Part of speech of the equivalent"
                                        value={field.pos ? field.pos : ''}
                                        onChange={(e) => handleChangeEqField(index, 'pos', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.examples && (
                                <>
                                    <h5>Example:</h5>
                                    <input
                                        type="text"
                                        id={`example-${index}`}
                                        className={styles.input}
                                        placeholder="Example of the equivalent"
                                        value={field.example ? field.example : ''}
                                        onChange={(e) => handleChangeEqField(index, 'example', e.target.value)}
                                    />
                                </>
                            )}

                        </div>
                    ))
                )}

                {data.fields.definitions && !data.fields.equivalents && (
                    defField.map((field, index) => (
                        <div key={`def-${index}`} className={styles.box} ref={el => defFieldRefs.current[index] = el}>

                            <div className={styles.headField}>
                                {index + 1}. Definitions Field

                                <div className={styles.icons}>
                                    <MdDeleteForever className={styles.iconDelete} onClick={() => handleRemoveDefField(index)} />
                                    <IoIosAddCircle className={styles.iconAdd} onClick={handleAddDefField} />
                                </div>
                            </div>

                            <h5>Definition:</h5>
                            <textarea
                                type="text"
                                id={`definition-${index}`}
                                className={`${styles.input} ${styles.textarea}`}
                                placeholder="Definition"
                                value={field.definition ? field.definition : ''}
                                onChange={(e) => handleChangeDefField(index, 'definition', e.target.value)}
                            />

                            {data.fields.terminologies && (
                                <>
                                    <h5>Terminology:</h5>
                                    <input
                                        type="text"
                                        id={`terminology-${index}`}
                                        className={styles.input}
                                        placeholder="Terminology"
                                        value={field.terminology ? field.terminology : ''}
                                        onChange={(e) => handleChangeDefField(index, 'terminology', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.pos && (
                                <>
                                    <h5>Part of speech:</h5>
                                    <input
                                        type="text"
                                        id={`pos-${index}`}
                                        className={styles.input}
                                        placeholder="Part of speech"
                                        value={field.pos ? field.pos : ''}
                                        onChange={(e) => handleChangeDefField(index, 'pos', e.target.value)}
                                    />
                                </>
                            )}

                            {data.fields.examples && (
                                <>
                                    <h5>Example:</h5>
                                    <input
                                        type="text"
                                        id={`example-${index}`}
                                        className={styles.input}
                                        placeholder="Example"
                                        value={field.example ? field.example : ''}
                                        onChange={(e) => handleChangeDefField(index, 'example', e.target.value)}
                                    />
                                </>
                            )}

                        </div>
                    ))
                )}

                {data.fields.definitions && data.fields.equivalents && (
                    <>
                        {defField.map((field, index) => (
                            <div key={`def-${index}`} className={styles.box} ref={el => defFieldRefs.current[index] = el}>

                                <div className={styles.headField}>
                                    {index + 1}. Definitions Field

                                    <div className={styles.icons}>
                                        <MdDeleteForever className={styles.iconDelete} onClick={() => handleRemoveDefField(index)} />
                                        <IoIosAddCircle className={styles.iconAdd} onClick={handleAddDefField} />
                                    </div>
                                </div>

                                <h5>Definition:</h5>
                                <textarea
                                    type="text"
                                    id={`definition-${index}`}
                                    className={`${styles.input} ${styles.textarea}`}
                                    placeholder="Definition"
                                    value={field.definition ? field.definition : ''}
                                    onChange={(e) => handleChangeDefField(index, 'definition', e.target.value)}
                                />

                                {data.fields.terminologies && (
                                    <>
                                        <h5>Terminology:</h5>
                                        <input
                                            type="text"
                                            id={`terminology-${index}`}
                                            className={styles.input}
                                            placeholder="Terminology"
                                            value={field.terminology ? field.terminology : ''}
                                            onChange={(e) => handleChangeDefField(index, 'terminology', e.target.value)}
                                        />
                                    </>
                                )}

                                {data.fields.pos && (
                                    <>
                                        <h5>Part of speech:</h5>
                                        <input
                                            type="text"
                                            id={`pos-${index}`}
                                            className={styles.input}
                                            placeholder="Part of speech"
                                            value={field.pos ? field.pos : ''}
                                            onChange={(e) => handleChangeDefField(index, 'pos', e.target.value)}
                                        />
                                    </>
                                )}

                                {data.fields.examples && (
                                    <>
                                        <h5>Example:</h5>
                                        <input
                                            type="text"
                                            id={`example-${index}`}
                                            className={styles.input}
                                            placeholder="Example"
                                            value={field.example ? field.example : ''}
                                            onChange={(e) => handleChangeDefField(index, 'example', e.target.value)}
                                        />
                                    </>
                                )}

                            </div>
                        ))}

                        {eqField.map((field, index) => (
                            <div key={`eq-${index}`} className={styles.box} ref={el => eqFieldRefs.current[index] = el}>

                                <div className={styles.headField}>
                                    {index + 1}. Equivalents Field

                                    <div className={styles.icons}>
                                        <MdDeleteForever className={styles.iconDelete} onClick={() => handleRemoveEqField(index)} />
                                        <IoIosAddCircle className={styles.iconAdd} onClick={handleAddEqField} />
                                    </div>

                                </div>

                                <h5>Equivalent:</h5>
                                <input
                                    type="text"
                                    id={`equivalent-${index}`}
                                    className={styles.input}
                                    placeholder="Equivalent"
                                    value={field.equivalent ? field.equivalent : ''}
                                    onChange={(e) => handleChangeEqField(index, 'equivalent', e.target.value)}
                                />

                                {data.fields.articles && (
                                    <>
                                        <h5>Article:</h5>
                                        <input
                                            type="text"
                                            id={`article-${index}`}
                                            className={styles.input}
                                            placeholder="Article"
                                            value={field.article ? field.article : ''}
                                            onChange={(e) => handleChangeEqField(index, 'article', e.target.value)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}

                {data.fields.explanations && (
                    <div className={styles.box}>

                        <h4>Explanation:</h4>

                        <textarea
                            type="text"
                            id="explanation"
                            className={`${styles.input} ${styles.textarea}`}
                            placeholder="Explanation"
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        />
                    </div>
                )}

                <div className={styles.flexRow}>

                    <button className={`${styles.button} ${styles.save}`} style={{ marginLeft: 'auto' }} type='submit'>
                        Save
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddWord;