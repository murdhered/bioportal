// Replace your existing file at: app/about/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AboutPageClient from "@/components/page-views/AboutPageClient";

// This is a Server Component. It can safely fetch data.
export default async function AboutPage() {
    // 1. Get the session data on the server.
    const session = await getServerSession(authOptions);

    // 2. Render the client component and pass the session data as a prop.
    return (
        <AboutPageClient session={session} />
    );
}