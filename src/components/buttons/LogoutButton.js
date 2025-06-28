// Path: src/components/buttons/LogoutButton.js

'use client';

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      // New styling for a clean, icon-only button
      className="w-9 h-9 flex items-center justify-center rounded-full
                 text-slate-300 bg-transparent
                 hover:bg-slate-700/80 hover:text-white
                 transition-colors"
      title="Logout" // Tooltip for accessibility
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
}