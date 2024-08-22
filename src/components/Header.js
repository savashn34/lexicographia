"use client";
import React, { useRef, useEffect, useState } from 'react'
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IoSearchSharp } from "react-icons/io5";
import { GrLogin, GrUser, GrDocumentText } from 'react-icons/gr';
import { BsPencilSquare } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { IoMdHome } from "react-icons/io";

function Header({ data }) {
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [query, setQuery] = useState('');

    const router = useRouter();

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        setIsOpen(false);
        const checkIsDesktop = () => window.innerWidth > 768;
        setIsDesktop(checkIsDesktop());

        const handleResize = () => {
            setIsDesktop(checkIsDesktop());
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [data]);

    useEffect(() => {
        const updateMenuItems = () => {
            const items = document.cookie.includes('Authorization')
                ? [
                    { text: 'Home', icon: <IoMdHome /> },
                    { text: 'About', icon: <GrDocumentText /> },
                    { text: 'Profile', icon: <GrUser /> },
                    { text: 'Dictionary', icon: <GrDocumentText /> },
                    { text: 'Logout', icon: <SlLogout /> }
                ] : [
                    { text: 'Home', icon: <IoMdHome /> },
                    { text: 'About', icon: <GrDocumentText /> },
                    { text: 'Login', icon: <GrLogin /> },
                    { text: 'Register', icon: <BsPencilSquare /> }
                ];
            setMenuItems(items);
        };

        updateMenuItems();
    }, [document.cookie])

    const menuList = menuItems.map(({ text, icon }) => {
        const href = `/${text.toLowerCase().replace(/ /g, '-')}`;

        const handleClick = () => {
            if (text === 'Logout') {
                document.cookie = 'Authorization=; Max-Age=0; path=/; secure; SameSite=Strict';
                router.push('/login');
            } else if (text === 'Home') {
                router.push('/');
            }
        };

        return (
            <div key={text} onClick={handleClick} className={`${styles.menuItem}`}>
                <Link href={href}>
                    <div style={{ width: '100%' }}>
                        {icon}
                        <span style={{ marginLeft: '8px' }}>{text}</span>
                    </div>
                </Link>
            </div>
        );
    });

    const handleSearch = (event) => {
        event.preventDefault();
        if (query.trim()) {
            router.push(`/${data.url}/search?word=${encodeURIComponent(query)}`);
        }
    }

    return (
        <div className={`${styles.header}`}>
            <div className={`${styles.headerContainer} ${styles.flexRow}`}>

                <div className={`${styles.appName} ${styles.appFont}`}>
                    <h1>
                        <Link href={'/'}>Lexicographia</Link>
                    </h1>
                </div>

                {!isDesktop && (!data || !data.name) ? (
                    <div className={`${styles.appNameMobile} ${styles.appFont}`}>
                        <h1>
                            <Link href={'/'}>Lexicographia</Link>
                        </h1>
                    </div>
                ) : (
                    <div className={`${styles.dictName}`}>
                        <h2>
                            <Link href={`/${data.url}`}>
                                {data?.name}
                            </Link>
                        </h2>
                    </div>
                )}

                <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={() => setIsOpen(!isOpen)}></div>

                <button className={`${styles.menuButtonContainer}`}>
                    <span className={`${styles.menuButton}`} onClick={() => setIsOpen(!isOpen)}>&#9776;</span>
                </button>

                <nav ref={menuRef} className={`${styles.menuContainer} ${isOpen ? styles.menuOpen : ''}`}>

                    {!isDesktop && (
                        <div className={`${styles.appNameDrawer} ${styles.appFont}`}>
                            <h1><a href="/">Lexicographia</a></h1>
                        </div>
                    )}

                    {menuList}

                </nav>

            </div>

            {data.filters && data.filters.letters && (
                <div>
                    <hr />
                    <div className={styles.letters}>

                        {data.filters.letters.sort().map((letter, index) => (
                            <div key={index}>
                                <Link href={`/${data.url}/letters/${letter.toLowerCase()}`} className={`${styles.link}`}>
                                    <h4>{letter}</h4>
                                </Link>
                            </div>
                        ))}

                    </div>
                    <hr />
                </div>
            )}

            <div className={styles.searchWrapper}>
                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        className={styles.searchInputBase}
                        placeholder="Search a word"
                        aria-label="search a word"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type="submit" className={styles.searchButton} aria-label="search">
                        <IoSearchSharp className={styles.searchIcon} />
                    </button>
                </form>
            </div>


        </div>
    )
}

export default Header;