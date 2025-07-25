// Path: src/actions/discordActions.js

'use server';

export async function getDiscordServerInfo(serverId) {
    if (!serverId) {
        return { error: "Server ID is required." };
    }

    try {
 
        const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);

        if (!response.ok) {
            
            return { error: "Could not fetch server info. Please check the ID and ensure the server widget is enabled in your Discord server settings." };
        }

        const data = await response.json();

       
        return {
            name: data.name,
            instant_invite: data.instant_invite,
            presence_count: data.presence_count,
        };
        
    } catch (e) {
        console.error("Discord API fetch error:", e);
        return { error: "An unexpected error occurred." };
    }
}
