import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function SocialButton({ href, icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="text-white/70 transition-opacity hover:text-white"
    >
      <FontAwesomeIcon className="w-6 h-6" icon={icon} />
    </Link>
  );
}