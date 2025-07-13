// *ath: src/components/buttons/AppLogoutButton.js

'use client';

import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function AppLogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-4 w-full p-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="w-6 h-6 text-gray-400"
      />
      <span className="font-medium">Logout</span>
    </button>
  );
}