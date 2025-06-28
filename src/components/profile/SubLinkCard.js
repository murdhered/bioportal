/* Path: src/components/profile/SubLinkCard.js */

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export function SubLinkCard({ link }) {
  // This ping is for your analytics, just like in your original code
  const pingUrl = (process.env.NEXT_PUBLIC_URL || '') + '/api/click?url=' + btoa(link.url) + '&page=' + link.pageUri;

  return (
    <Link
      href={link.url}
      target="_blank"
      ping={pingUrl}
      className="w-full flex items-center p-2 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
    >
      {/* Icon on the left */}
      <div className="w-16 h-16 bg-white/10 rounded-lg flex-shrink-0 flex items-center justify-center mr-4">
        {link.icon ? (
          <Image
            className="w-full h-full object-cover rounded-lg"
            src={link.icon}
            alt={link.title || 'icon'}
            width={64}
            height={64}
          />
        ) : (
          <FontAwesomeIcon icon={faLink} className="w-8 h-8 text-white/80" />
        )}
      </div>

      {/* Text on the right */}
      <div className="flex-grow text-left">
        <h3 className="font-bold text-white text-lg">{link.title}</h3>
        {link.subtitle && (
          <p className="text-white/70 text-sm">{link.subtitle}</p>
        )}
      </div>
    </Link>
  );
}