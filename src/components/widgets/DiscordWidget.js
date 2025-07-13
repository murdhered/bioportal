// Path: src/components/widgets/DiscordWidget.js

'use client';

import { useEffect, useState } from "react";
import { getDiscordServerInfo } from "@/actions/discordActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function WidgetSkeleton() {
    return (
        <div className="w-full max-w-sm bg-black/40 backdrop-blur-xl p-4 rounded-2xl animate-pulse border border-white/10">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="w-32 h-5 bg-gray-700 rounded"></div>
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="w-20 h-10 bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    );
}


export default function DiscordWidget({ serverId }) {
    const [serverData, setServerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getDiscordServerInfo(serverId);
            if (data.error) {
                setError(data.error);
            } else {
                setServerData(data);
            }
            setLoading(false);
        }

        fetchData();
    }, [serverId]);

    if (loading) {
        return <WidgetSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg border border-red-500/50">
                <p className="font-bold">Discord Widget Error</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm bg-black/40 backdrop-blur-xl text-white p-4 rounded-2xl shadow-lg border border-white/10">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faDiscord} className="w-6 h-6 text-white/80" />
                        <h3 className="font-bold text-lg text-white">{serverData.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                        <FontAwesomeIcon icon={faCircle} className="w-2 h-2 text-green-400" />
                        <span>{serverData.presence_count.toLocaleString()} Members Online</span>
                    </div>
                </div>
                <Link
                    href={serverData.instant_invite || '#'}
                    target="_blank"
                    className="
                        bg-white/10 border border-white/20 text-white 
                        font-semibold py-2 px-5 rounded-lg 
                        hover:bg-white/20 transition-colors backdrop-blur-md
                    "
                >
                    Join
                </Link>
            </div>
        </div>
    );
}
