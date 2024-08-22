"use client";
import React, { useRef, useEffect, useState } from 'react'
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { GrLogin, GrUser, GrDocumentText } from 'react-icons/gr';
import { BsPencilSquare } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { IoMdHome } from "react-icons/io";

function HeaderMain() {
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

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
    }, []);

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

    const dictNameSize = isDesktop ? 28 : 23;

    const pathname = usePathname();
    const segments = pathname.split('/');
    const desiredSegment = segments[segments.length - 1];

    const path = desiredSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return (
        <>
            <div className={`${styles.header}`}>
                <div className={`${styles.headerMainContainer} ${styles.flexRow}`}>

                    <div className={`${styles.appName} ${styles.appFont}`}>
                        <h1>
                            <Link href={'/'}>Lexicographia</Link>
                        </h1>
                    </div>

                    {!isDesktop && (!path) ? (
                        <div className={`${styles.appNameMobile} ${styles.appFont}`}>
                            <h1>
                                <Link href={'/'}>Lexicographia</Link>
                            </h1>
                        </div>
                    ) : (
                        <div className={`${styles.dictName}`}>
                            <h2 style={{ fontSize: dictNameSize }}>
                                <Link href={pathname ? pathname : '/'}>

                                    {
                                        !path ?
                                            'The Lexicographia Organization' :
                                            (segments[1] === 'profile' ? 'Profile' : path)
                                    }

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
            </div>
        </>
    )

}

export default HeaderMain;