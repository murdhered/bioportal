/* Path: src/components/profile/LinkCard.js */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SocialButton } from "./SocialButton";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// This component displays the main profile info (avatar, name, social pill)
export function LinkCard({ user, page, buttonsIcons, buttonLink }) {
  // Filter for buttons that exist in the user's data
  const socialButtons = Object.keys(page.buttons || {})
    .filter(key => page.buttons[key] && buttonsIcons[key]);

  return (
    <div className="relative w-full max-w-md bg-black/30 backdrop-blur-xl rounded-3xl p-6 text-center border border-white/10 shadow-lg">
      {/* Avatar overlapping the top edge */}
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

      {/* Card Content */}
      <div className="flex flex-col items-center gap-2 pt-14">
        <h1 className="text-3xl font-bold text-white">{page.displayName || 'User Name'}</h1>

        {/* Location Display */}
        {page.location && (
          <div className="flex justify-center items-center gap-2 text-base text-white/70">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
            <span>{page.location}</span>
          </div>
        )}

        {/* Bio Display */}
        {page.bio && (
          <p className="text-sm text-white/80 mt-2">
            {page.bio}
          </p>
        )}


        {/* Social Icons Pill */}
        <div className="mt-4 p-4 w-full bg-black/30 rounded-full border border-white/10 shadow-inner">
          <div className="flex justify-around items-center flex-wrap gap-4">
            {/* --- THIS IS THE FIX --- */}
            {/* We now pass the `buttonKey` and `value` props to the SocialButton */}
            {socialButtons.map(key => (
              <SocialButton
                key={key}
                buttonKey={key} // Pass the key (e.g., 'discord')
                href={buttonLink(key, page.buttons[key])} // Still pass href for other links
                icon={buttonsIcons[key]}
                value={page.buttons[key]} // Pass the value to be copied
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
