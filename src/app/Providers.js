// Create this new file at: src/app/Providers.js

'use client';

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  // This client component correctly wraps the SessionProvider
  // and makes the session available to any child component.
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}