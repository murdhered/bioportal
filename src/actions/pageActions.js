'use server';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Page} from "@/models/Page";
import {User} from "@/models/User";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { revalidatePath } from "next/cache";

export async function updateUsername(formData) {
    const newUsername = formData.get('username');
    
    await mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);

    if (!session) {
        return { error: 'Not authenticated.' };
    }

    // Check if the new username is already taken by another page
    const existingPage = await Page.findOne({ uri: newUsername });
    if (existingPage) {
        return { error: 'This username is already taken.' };
    }

    // If it's available, update the current user's page
    const result = await Page.updateOne(
        { owner: session.user.email },
        { uri: newUsername }
    );

    if (result.modifiedCount > 0) {
        // Clear the cache for the account page to reflect the change
        revalidatePath('/account');
        return { success: 'Username updated successfully!' };
    }

    return { error: 'Could not update username.' };
}

export async function savePageSettings(formData) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    // --- UPDATED: Added 'robloxUrl' to the list of keys to save ---
    const dataKeys = [
      'displayName','location',
      'bio', 'bgType', 'bgColor', 'bgImage',
      'robloxUrl',
    ];

    const dataToUpdate = {};
    for (const key of dataKeys) {
      if (formData.has(key)) {
        // Simple validation for Roblox URL format
        if (key === 'robloxUrl') {
            const url = formData.get(key);
            const robloxUrlRegex = /^https:\/\/www\.roblox\.com\/users\/\d+\/profile$/;
            if (url && !robloxUrlRegex.test(url)) {
                // Do not save if the format is invalid but was not empty
                continue; 
            }
        }
        dataToUpdate[key] = formData.get(key);
      }
    }

    await Page.updateOne(
      {owner:session?.user?.email},
      dataToUpdate,
    );

    if (formData.has('avatar')) {
      const avatarLink = formData.get('avatar');
      await User.updateOne(
        {email: session.user?.email},
        {image: avatarLink},
      );
    }

    return true;
  }

  return false;
}

// --- THIS IS THE MAIN FIX ---
// The function now accepts a plain JavaScript object (`buttons`) instead of FormData.
export async function savePageButtons(buttons) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    // We update the entire 'buttons' object in the database directly.
    await Page.updateOne(
      {owner:session?.user?.email},
      {buttons},
    );
    return true;
  }
  return false;
}

export async function savePageLinks(links) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne(
      {owner:session?.user?.email},
      {links},
    );
    return true; // Added success return value for consistency
  } else {
    return false;
  }
}

export async function savePageWidgets(formData) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    const dataToUpdate = {
      discordServerId: formData.get('discordServerId'),
    };
    await Page.updateOne(
      { owner: session.user.email },
      dataToUpdate,
    );
    return true;
  }
  return false;
}

export async function saveSoundCloudUrl(formData) {
    await mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);

    if (session) {
        const soundCloudUrl = formData.get('soundCloudUrl');

        // Regex to validate SoundCloud track URLs
        const soundCloudRegex = /^(https?:\/\/)?(www\.)?(soundcloud\.com|snd\.sc)\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
        
        // We only validate if the user entered something. An empty string is allowed to clear the field.
        if (soundCloudUrl && soundCloudUrl.length > 0 && !soundCloudRegex.test(soundCloudUrl)) {
            // Return an object with an error message if the format is invalid
            return {error: 'Please enter a valid SoundCloud track URL.'};
        }

        // Find the user's page and update ONLY the soundCloudUrl field
        await Page.updateOne(
            { owner: session.user.email },
            { soundCloudUrl: soundCloudUrl },
        );
        
        // Revalidate the user's public page to show the change immediately
        const page = await Page.findOne({owner: session.user.email});
        if (page) {
            revalidatePath('/' + page.uri);
        }
        
        // Return a success object
        return {success: 'Music settings saved!'};
    }

    return {error: 'Authentication failed.'};
}