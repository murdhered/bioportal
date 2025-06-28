// Path: Header.js

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getServerSession} from "next-auth";
import Image from "next/image"; // Import the Next.js Image component
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center bg-slate-800/80 backdrop-blur-md rounded-full px-4 py-2 border border-slate-700 shadow-lg">

          {/* Left side: Logo and primary navigation */}
          <div className="flex items-center gap-6">
            <Link href={'/'} className="flex items-center gap-2 text-white">
              <FontAwesomeIcon icon={faLink} />
              <span className="font-bold text-lg">BioPortal</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-slate-300 text-sm">
              <Link href={'/about'} className="hover:text-white transition-colors">About</Link>
              <Link href={'/pricing'} className="hover:text-white transition-colors">Pricing</Link>
              <Link href={'/contact'} className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Right side: Authentication links */}
          <div className="flex items-center gap-2 text-sm">
            {session ? (
              // --- UPDATED: This is the new "User Menu" for logged-in users ---
              <>
                <Link
                  href={'/account'}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-slate-300
                             hover:bg-slate-700/80 hover:text-white transition-colors"
                >
                  {/* User Avatar */}
                  <Image
                    src={session?.user?.image}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {/* User Name (First name only) */}
                  <span className="hidden sm:block font-semibold">
                    {session?.user?.name?.split(' ')[0]}
                  </span>
                </Link>
                <LogoutButton />
              </>
            ) : (
              // This is the view for logged-out users (unchanged)
              <>
                <Link href={'/login'} className="text-slate-300 hover:text-white transition-colors px-3 py-1.5">
                  Sign In
                </Link>
                <Link
                  href={'/login'}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}