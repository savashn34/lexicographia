"use client";
import React from 'react';
import styles from '../styles/wordcard.module.css';
import { usePathname, useRouter } from 'next/navigation';

const concatenate = (...args) => {
    return args.filter(arg => arg != null && arg !== "").join(', ');
};

function Word({ data }) {
    const router = useRouter();
    const pathname = usePathname();

    const segments = pathname.split('/');
    const dbUrl = segments[1];
    const wordUrl = segments[2];

    const handleAddRedirect = () => {
        router.push(`/${dbUrl}/${wordUrl}/edit`);
    }

    const word = data.word;

    return (
        <div>
            <div className={styles.content}>

                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.cardContent}>

                            <div className={styles.headContainer}>

                                <h5 className={styles.wordTitle}>
                                    {word.word}
                                </h5>

                                {(word.etymology || word.spelling) && (
                                    (word.etymology && word.spelling) ? (
                                        <p className={styles.wordInfo}>
                                            {word.etymology} {word.spelling}
                                        </p>
                                    ) : (
                                        <p className={styles.wordInfo}>
                                            {word.etymology ? word.etymology : null}
                                            {word.spelling ? word.spelling : null}
                                        </p>
                                    )
                                )}

                                {(word.article || word.gender || word.pattern || word.root) && (
                                    <p className={styles.wordInfo}>
                                        {concatenate(
                                            word.article ? word.article : null,
                                            word.gender ? word.gender : null,
                                            word.pattern ? word.pattern : null,
                                            word.root ? word.root : null
                                        )}
                                    </p>
                                )}

                            </div>

                            <hr />

                            {word.equivalents && !word.definitions && (
                                word.equivalents.map((eq, index) => (
                                    <div key={index}>
                                        <div className={styles.definitions}>

                                            <span className={styles.definition}>
                                                <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>

                                                {concatenate(
                                                    eq.gender ? eq.gender : null,
                                                    eq.article ? eq.article : null,
                                                    eq.pos ? eq.pos : null,
                                                    eq.terminology ? eq.terminology : null
                                                ).split(', ').map((item, idx) => (
                                                    <span key={idx}>
                                                        {idx > 0 && ', '}
                                                        <em className={styles.adverb}>{item}</em>
                                                    </span>
                                                ))}

                                                {eq.equivalent && (eq.gender || eq.article || eq.pos || eq.terminology) ? (
                                                    <>
                                                        , {eq.equivalent}
                                                    </>
                                                ) : (
                                                    <>
                                                        {eq.equivalent}
                                                    </>
                                                )}
                                            </span>

                                            {eq.example && (
                                                <p className={styles.example}>"{eq.example}"</p>
                                            )}

                                        </div>
                                    </div>
                                ))
                            )}

                            {word.definitions && !word.equivalents && (
                                word.definitions.map((def, index) => (
                                    <div key={index}>
                                        <div className={styles.definitions}>

                                            <span className={styles.definition}>
                                                <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>

                                                {concatenate(
                                                    def.pos ? def.pos : null,
                                                    def.terminology ? def.terminology : null
                                                ).split(', ').map((item, idx) => (
                                                    <span key={idx}>
                                                        {idx > 0 && ', '}
                                                        <em className={styles.adverb}>{item}</em>
                                                    </span>
                                                ))}

                                                {def.definition && (def.pos || def.terminology) ? (
                                                    <>
                                                        , {def.definition}
                                                    </>
                                                ) : (
                                                    <>
                                                        {def.definition}
                                                    </>
                                                )}

                                            </span>

                                            {def.example && (
                                                <p className={styles.example}>"{def.example}"</p>
                                            )}

                                        </div>
                                    </div>
                                ))
                            )}

                            {word.definitions && word.equivalents && (
                                <>
                                    {word.definitions.map((def, index) => (
                                        <div key={index}>
                                            <div className={styles.definitions}>

                                                <span className={styles.definition}>
                                                    <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>

                                                    {concatenate(
                                                        def.pos ? def.pos : null,
                                                        def.terminology ? def.terminology : null
                                                    ).split(', ').map((item, idx) => (
                                                        <span key={idx}>
                                                            {idx > 0 && ', '}
                                                            <em className={styles.adverb}>{item}</em>
                                                        </span>
                                                    ))}

                                                    {def.definition && (def.pos || def.terminology) ? (
                                                        <>
                                                            , {def.definition}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {def.definition}
                                                        </>
                                                    )}

                                                </span>

                                                {def.example && (
                                                    <p className={styles.example}>"{def.example}"</p>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                    <hr />
                                    <div className={styles.equivalents}>
                                        {word.equivalents.filter(eq => eq.equivalent).map((eq, index) => (
                                            <span key={index}>
                                                {index > 0 && ', '}
                                                <span>
                                                    {eq.equivalent}
                                                    {eq.article && (
                                                        <span style={{ fontStyle: 'italic' }}> (<em>{eq.article}</em>)</span>
                                                    )}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}

                            {word.explanation && (
                                <>
                                    <hr />
                                    <br />
                                    {word.explanation}
                                    <br />
                                </>
                            )}

                        </div>

                        {data.dictionary.admin && (

                            <div className={styles.box}>
                                <button
                                    className={styles.button}
                                    onClick={handleAddRedirect}
                                >
                                    <p>EDIT THIS WORD</p>
                                </button>
                            </div>

                        )}

                    </div>
                </div>
            </div >
        </div>
    )
}

export default Word;