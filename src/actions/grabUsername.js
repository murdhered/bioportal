'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // Make sure to import redirect

export default async function grabUsername(formData) {
    const username = formData.get('username');
    
    await mongoose.connect(process.env.MONGO_URI);

    const existingPageDoc = await Page.findOne({ uri: username });
    if (existingPageDoc) {
        return false; // Username is definitely taken.
    }

    // --- THIS IS THE CRITICAL FIX ---
    // We check for a 'checkOnly' flag sent from the form's real-time validator.
    const checkOnly = formData.get('checkOnly');
    if (checkOnly) {
        // If we are only checking, and the name is not taken, we return true and STOP.
        return true; // Username is available.
    }
    // --- END OF FIX ---


    // The code below will now ONLY run on the final form submission,
    // not during the real-time check.
    const session = await getServerSession(authOptions);
    if (!session) {
        return false; // Safety check
    }

    const newPageDoc = await Page.create({
        uri: username,
        owner: session.user.email,
    });

    // If the page was created successfully, we redirect on the server.
    if (newPageDoc) {
        return redirect('/account?created=' + username);
    }

    return false;
}