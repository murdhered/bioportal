// Replace the code in this file: app/account/page.js

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import {Page} from "@/models/Page";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import cloneDeep from 'clone-deep';

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect('/');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ owner: session.user.email });

  // --- THIS IS THE UPDATED VIEW FOR A NEW USER ---
  if (!page) {
    return (
      // This new container centers the form vertically and horizontally
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md w-full">
            <UsernameForm desiredUsername={desiredUsername} />
        </div>
      </div>
    );
  }

  // This is the view for an existing user
  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  return (
    // We can wrap the existing user forms for consistent centering and max-width
    <div className="max-w-4xl mx-auto space-y-8">
      <PageSettingsForm page={leanPage} user={session.user} />
      <PageButtonsForm page={leanPage} user={session.user} />
      <PageLinksForm page={leanPage} user={session.user} />
    </div>
  );
}