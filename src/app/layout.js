// Path: app/layout.js

import { Lato } from 'next/font/google';
import './globals.css';
import Providers from "./Providers"; // Your SessionProvider wrapper
import AppThemeProvider from "./ThemeProvider"; // 1. Import the new ThemeProvider

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'BioPortal',
  description: 'All your links in one place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning */}
      <body className={lato.className}>
        {/* 2. Wrap everything in our new providers */}
        {/* This makes the theme and session available to your entire app */}
        <AppThemeProvider>
          <Providers>
            {children}
          </Providers>
        </AppThemeProvider>
      </body>
    </html>
  );
}
