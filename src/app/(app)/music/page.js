// Path: app/(app)/music/page.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import MusicSettingsForm from "@/components/forms/MusicSettingsForm"; // We will create this next
import cloneDeep from 'clone-deep';

export default async function MusicPage() {
    await mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/');
    }

    const page = await Page.findOne({ owner: session.user.email });
    if (!page) {
        // Redirect users who haven't created a page yet
        return redirect('/account');
    }

    // Safely pass page data to the client component form
    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border">
                <MusicSettingsForm page={leanPage} />
            </div>
        </div>
    );
}
