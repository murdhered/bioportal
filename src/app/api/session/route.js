// Path: app/api/session/route.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    // This safely gets the session on the server
    const session = await getServerSession(authOptions);

    if (!session) {
        // If no user is logged in, return that status
        return NextResponse.json({ isLoggedIn: false });
    }

    // If a user is logged in, return their details
    return NextResponse.json({
        isLoggedIn: true,
        user: {
            name: session.user.name,
            email: session.user.email,
        }
    });
}