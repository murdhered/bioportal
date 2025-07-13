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

    const existingPage = await Page.findOne({ uri: newUsername });
    if (existingPage) {
        return { error: 'This username is already taken.' };
    }

    const result = await Page.updateOne(
        { owner: session.user.email },
        { uri: newUsername }
    );

    if (result.modifiedCount > 0) {
        revalidatePath('/account');
        return { success: 'Username updated successfully!' };
    }

    return { error: 'Could not update username.' };
}

export async function savePageSettings(formData) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    const dataKeys = [
      'displayName','location',
      'bio', 'bgType', 'bgColor', 'bgImage',
      'robloxUrl',
    ];

    const dataToUpdate = {};
    for (const key of dataKeys) {
      if (formData.has(key)) {
        if (key === 'robloxUrl') {
            const url = formData.get(key);
            const robloxUrlRegex = /^https:\/\/www\.roblox\.com\/users\/\d+\/profile$/;
            if (url && !robloxUrlRegex.test(url)) {
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


export async function savePageButtons(buttons) {
  await mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (session) {

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
    return true; 
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

       
        const soundCloudRegex = /^(https?:\/\/)?(www\.)?(soundcloud\.com|snd\.sc)\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
        
        
        if (soundCloudUrl && soundCloudUrl.length > 0 && !soundCloudRegex.test(soundCloudUrl)) {
            
            return {error: 'Please enter a valid SoundCloud track URL.'};
        }

      
        await Page.updateOne(
            { owner: session.user.email },
            { soundCloudUrl: soundCloudUrl },
        );
        
       
        const page = await Page.findOne({owner: session.user.email});
        if (page) {
            revalidatePath('/' + page.uri);
        }
        
      
        return {success: 'Music settings saved!'};
    }

    return {error: 'Authentication failed.'};
}