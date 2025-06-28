import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faDiscord, faFacebook, faGithub, faInstagram, faTelegram,
  faTiktok, faWhatsapp, faYoutube, faXTwitter, faSpotify
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

import { LinkCard } from "@/components/profile/LinkCard";
// --- ADDED: Import the new component for your other links ---
import { SubLinkCard } from "@/components/profile/SubLinkCard.js";


export const buttonsIcons = {
  email: faEnvelope, mobile: faPhone, instagram: faInstagram,
  facebook: faFacebook, discord: faDiscord, tiktok: faTiktok,
  youtube: faYoutube, whatsapp: faWhatsapp, github: faGithub,
  telegram: faTelegram, x: faXTwitter, spotify: faSpotify,
};

function buttonLink(key, value) {
  if (key === 'mobile') return 'tel:' + value;
  if (key === 'email') return 'mailto:' + value;
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  await mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ uri });
  if (!page || !page.owner) {
    return <div className="text-white">Page or owner not found.</div>;
  }
  const user = await User.findOne({ email: page.owner });
  if (!user) {
    return <div className="text-white">User not found.</div>;
  }

  await Event.create({ uri: uri, page: uri, type: 'view' });

  const backgroundStyle = page.bgType === 'color'
    ? { backgroundColor: page.bgColor }
    : {
        backgroundImage: `url(${page.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };

  return (
    <div>
      <div className="fixed inset-0 w-screen h-screen -z-10" style={backgroundStyle}></div>

      {/* Main container with animation */}
      <div className="animate-fade-in-up flex flex-col items-center gap-8 w-full max-w-md">
        {/* Your main profile card */}
        <LinkCard
          user={user}
          page={page}
          buttonsIcons={buttonsIcons}
          buttonLink={buttonLink}
        />

        {/* --- ADDED: Section to display your other links --- */}
        {page.links && page.links.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {page.links.map(link => (
              <SubLinkCard key={link.url} link={{...link, pageUri: page.uri}} />
            ))}
          </div>
        )}
        {/* --- END of new code --- */}
      </div>
    </div>
  );
}