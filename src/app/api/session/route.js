// Path: app/api/session/route.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ isLoggedIn: false });
    }

    return NextResponse.json({
        isLoggedIn: true,
        user: {
            name: session.user.name,
            email: session.user.email,
        }
    });
}