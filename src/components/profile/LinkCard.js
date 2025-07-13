/* Path: src/components/profile/LinkCard.js */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SocialButton } from "./SocialButton";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function LinkCard({ user, page, buttonsIcons, buttonLink }) {
  const socialButtons = Object.keys(page.buttons || {})
    .filter(key => page.buttons[key] && buttonsIcons[key]);

  return (
    <div className="relative w-full max-w-md bg-black/30 backdrop-blur-xl rounded-3xl p-6 text-center border border-white/10 shadow-lg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          className="rounded-full w-28 h-28 object-cover ring-4 ring-black/40"
          src={user.image}
          alt="avatar"
          width={128}
          height={128}
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-2 pt-14">
        <h1 className="text-3xl font-bold text-white">{page.displayName || 'User Name'}</h1>

        {page.location && (
          <div className="flex justify-center items-center gap-2 text-base text-white/70">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
            <span>{page.location}</span>
          </div>
        )}

        {page.bio && (
          <p className="text-sm text-white/80 mt-2">
            {page.bio}
          </p>
        )}


        <div className="mt-4 p-4 w-full bg-black/30 rounded-full border border-white/10 shadow-inner">
          <div className="flex justify-around items-center flex-wrap gap-4">
            {socialButtons.map(key => (
              <SocialButton
                key={key}
                buttonKey={key} 
                href={buttonLink(key, page.buttons[key])} 
                icon={buttonsIcons[key]}
                value={page.buttons[key]} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
