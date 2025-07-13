// Path: app/about/page.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AboutPageClient from "@/components/page-views/AboutPageClient";


export default async function AboutPage() {
  
    const session = await getServerSession(authOptions);


    return (
        <AboutPageClient session={session} />
    );
}