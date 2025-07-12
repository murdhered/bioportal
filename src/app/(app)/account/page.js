// Path: app/(app)/account/page.js

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
import ChangeUsernameForm from "@/components/forms/ChangeUsernameForm"; // <-- 1. Import the new form

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect('/');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ owner: session.user.email });

  if (!page) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md w-full">
            <UsernameForm desiredUsername={desiredUsername} />
        </div>
      </div>
    );
  }

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 2. Add the new ChangeUsernameForm component here */}
      
      
      <PageSettingsForm page={leanPage} user={session.user} />
      <ChangeUsernameForm page={leanPage} />
      <PageButtonsForm page={leanPage} user={session.user} />
      <PageLinksForm page={leanPage} user={session.user} />
    </div>
  );
}
