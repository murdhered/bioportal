// Path: src/components/buttons/ThemeSwitcher.js

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function ThemeSwitcher({ className = '' }) {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // To prevent hydration mismatch, render a placeholder or null on the server.
        return <div className={`w-10 h-10 rounded-full ${className}`}></div>;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${className}`}
            aria-label="Toggle theme"
        >
            {currentTheme === 'dark' ? (
                <FontAwesomeIcon icon={faSun} className="w-5 h-5" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
            )}
        </button>
    );
}
