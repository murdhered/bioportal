// Path: src/actions/emailActions.js

'use server';

import { Resend } from 'resend';
import { Contact } from '@/models/Contact'; 
import mongoose from 'mongoose'; 


const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendContactEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');


    if (!name || !email || !message) {
        return { error: 'All fields are required.' };
    }


    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Contact.create({ name, email, message });
    } catch (dbError) {
        console.error("Database save error:", dbError);

    }
 


    try {
        const { data, error } = await resend.emails.send({
            from: 'BioPortal Contact Form <onboarding@resend.dev>',
            to: ['micaellobato530@gmail.com'], 
            subject: `New Message from ${name} via BioPortal`,
            reply_to: email, 
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