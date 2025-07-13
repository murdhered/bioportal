// Path: src/components/MusicPlayer.js

'use client';


export default function MusicPlayer({ url }) {
    if (!url) {
        return null;
    }

   
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%234f46e5&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

    return (
        <div className="w-full max-w-sm">
            <iframe
                width="100%"
                height="166"
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
