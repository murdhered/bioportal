// Path: src/actions/emailActions.js

'use server';

import { Resend } from 'resend';
import { Contact } from '@/models/Contact'; // <-- 1. Import the new Contact model
import mongoose from 'mongoose'; // <-- Import mongoose

// Initialize Resend with your API key from the .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

// This is the server action that will be called by your form
export async function sendContactEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
        return { error: 'All fields are required.' };
    }

    // --- NEW: Save the submission to the database ---
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Contact.create({ name, email, message });
    } catch (dbError) {
        console.error("Database save error:", dbError);
        // We can still try to send the email even if the DB save fails
    }
    // --- End of new database logic ---


    try {
        const { data, error } = await resend.emails.send({
            from: 'BioPortal Contact Form <onboarding@resend.dev>',
            to: ['micaellobato530@gmail.com'], // <-- REPLACE WITH YOUR EMAIL
            subject: `New Message from ${name} via BioPortal`,
            reply_to: email, // Set the "reply-to" header for convenience
            html: `
                <p>You have received a new message from your BioPortal contact form.</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `
        });

        if (error) {
            console.error("Resend error:", error);
            return { error: 'Failed to send message.' };
        }

        return { success: true };

    } catch (e) {
        console.error("Email sending exception:", e);
        return { error: 'An unexpected error occurred.' };
    }
}