// Create this new file at: app/(app)/leaderboard/page.js

import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faLink } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

// A small component to style the top 3 ranks
function RankIcon({ rank }) {
    if (rank === 1) return <FontAwesomeIcon icon={faTrophy} className="text-yellow-400" />;
    if (rank === 2) return <FontAwesomeIcon icon={faTrophy} className="text-gray-400" />;
    if (rank === 3) return <FontAwesomeIcon icon={faTrophy} className="text-orange-400" />;
    return <span className="text-gray-500 font-bold">{rank}</span>;
}

export default async function LeaderboardPage() {
    await mongoose.connect(process.env.MONGO_URI);

    // This is an advanced database query to get the leaderboard data
    const leaderboardData = await Event.aggregate([
        // 1. Get only the 'view' events
        { $match: { type: 'view' } },
        // 2. Group by page URI and count the views for each
        { $group: {
            _id: "$uri",
            views: { "$sum": 1 }
        }},
        // 3. Sort by the highest view count
        { $sort: { views: -1 } },
        // 4. Limit to the top 100 results
        { $limit: 100 },
        // 5. Look up the corresponding page data for each result
        { $lookup: {
            from: 'pages',
            localField: '_id',
            foreignField: 'uri',
            as: 'pageData'
        }},
        // 6. Deconstruct the pageData array to a single object
        { $unwind: "$pageData" },
        // 7. Look up the user data for each page owner
        { $lookup: {
            from: 'users',
            localField: 'pageData.owner',
            foreignField: 'email',
            as: 'userData'
        }},
        // 8. Deconstruct the userData array
        { $unwind: "$userData" },
        // 9. Select only the fields we need for the final result
        { $project: {
            _id: 0,
            uri: "$_id",
            displayName: "$pageData.displayName",
            avatar: "$userData.image",
            views: "$views",
        }}
    ]);

    return (
        <div className="max-w-4xl mx-auto my-8">
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border">
                <div className="text-center mb-8">
                    <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 text-4xl mb-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Top Creators</h1>
                    <p className="text-gray-500 mt-1">See the most viewed profiles on our website.</p>
                </div>
                
                {/* The list of ranked users */}
                <div className="space-y-2">
                    {leaderboardData.map((item, index) => (
                        <div
                            key={item.uri}
                            className="p-3 bg-white flex items-center gap-4 rounded-lg border
                                       data-[rank='1']:bg-yellow-50 data-[rank='2']:bg-gray-100 data-[rank='3']:bg-orange-50"
                            data-rank={index + 1}
                        >
                            <div className="w-8 text-center text-lg">
                                <RankIcon rank={index + 1} />
                            </div>
                            <Image
                                src={item.avatar}
                                alt={`${item.displayName}'s avatar`}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-gray-800">{item.displayName}</h3>
                                <p className="text-sm text-gray-500">{item.views.toLocaleString()} views</p>
                            </div>
                            <Link
                                href={'/' + item.uri}
                                target="_blank"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faLink} className="w-3 h-3"/>
                                <span>Visit</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}