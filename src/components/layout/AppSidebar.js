'use client';

// --- 1. Import signOut and the logout icon ---
import {signOut} from "next-auth/react";
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import {faArrowLeft, faChartLine, faRightFromBracket, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link
        href={'/account'}
        className={
          "flex gap-4 p-2 "
          + (path === '/account' ? 'text-blue-500' : '')
        }>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className={'w-6 h-6'}
        />
        <span className="">My Page</span>
      </Link>
      <Link
        href={'/analytics'}
        className={
          "flex gap-4 p-2 "
          + (path === '/analytics' ? 'text-blue-500' : '')
        }>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className={'w-6 h-6'}
        />
        <span className="">Analytics</span>
      </Link>
      <Link
        href={'/leaderboard'}
        className={
          "flex gap-4 p-2 "
          + (path === '/leaderboard' ? 'text-blue-500' : '')
        }>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faTrophy}
          className={'w-6 h-6'}
        />
        <span className="">Leaderboard</span>
      </Link>

      {/* --- 2. Replaced <AppLogoutButton> with a standard <button> --- */}
      {/* It now has the exact same classes and structure as the Links above */}
      <button
        onClick={() => signOut()}
        className="flex gap-4 p-2"
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faRightFromBracket}
          className={'w-6 h-6'}
        />
        <span className="">Logout</span>
      </button>

      <Link href={'/'} className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4">
        <FontAwesomeIcon icon={faArrowLeft} className={'w-3 h-3'} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}