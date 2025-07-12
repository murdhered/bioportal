// Path: src/app/ThemeProvider.js

'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function AppThemeProvider({ children }) {
    // This state ensures the component only renders on the client, preventing hydration errors.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading spinner
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
