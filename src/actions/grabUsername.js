'use server';

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; 

export default async function grabUsername(formData) {
    const username = formData.get('username');
    
    await mongoose.connect(process.env.MONGO_URI);

    const existingPageDoc = await Page.findOne({ uri: username });
    if (existingPageDoc) {
        return false; 
    }

    
    const checkOnly = formData.get('checkOnly');
    if (checkOnly) {
        
        return true;
    }




    const session = await getServerSession(authOptions);
    if (!session) {
        return false; 
    }

    const newPageDoc = await Page.create({
        uri: username,
        owner: session.user.email,
    });

  
    if (newPageDoc) {
        return redirect('/account?created=' + username);
    }

    return false;
}