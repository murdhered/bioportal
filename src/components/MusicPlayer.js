// Path: src/components/MusicPlayer.js

'use client';

// This component uses the reliable iframe method.
export default function MusicPlayer({ url }) {
    if (!url) {
        return null;
    }

    // --- THIS IS THE FIX ---
    // We are now using the "visual" player. It looks better and provides
    // a clear play button for the user, which is required by browser autoplay policies.
    // We also set auto_play to false, as the user will be the one to start it.
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%234f46e5&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

    return (
        // The container is a simple div that will be centered on the page.
        <div className="w-full max-w-sm">
            <iframe
                width="100%"
                height="166" // The standard height for the visual player
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={embedUrl}
                className="rounded-xl shadow-lg"
            >
            </iframe>
        </div>
    );
}
