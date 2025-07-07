// Path: app/(app)/widgets/page.js

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import WidgetsForm from "@/components/forms/WidgetsForm";
import DiscordWidget from "@/components/widgets/DiscordWidget";

export default async function WidgetsPage() {
    const session = await getServerSession(authOptions);
    if (!session) { return redirect('/'); }

    await mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ owner: session.user.email });
    if (!page) { return redirect('/account'); }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <section className="bg-white p-8 rounded-xl shadow-lg border">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Your Widgets</h1>
                <p className="text-gray-500 mb-6">Add dynamic content from other platforms to your page.</p>
                <WidgetsForm page={JSON.parse(JSON.stringify(page))} />
            </section>

            {/* Live Preview Section */}
            <section className="bg-white p-8 rounded-xl shadow-lg border">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Previews</h2>
                <div className="space-y-6">
                    {page.discordServerId && (
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Discord Server</h3>
                            <div className="flex justify-center">
                                <DiscordWidget serverId={page.discordServerId} />
                            </div>
                        </div>
                    )}
                    {!page.discordServerId && (
                         <p className="text-center text-gray-400 py-4">Add a Discord Server ID above to see a preview.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
