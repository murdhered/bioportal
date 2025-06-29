'use server';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Page} from "@/models/Page";
import {User} from "@/models/User";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

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