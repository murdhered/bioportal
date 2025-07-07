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
import { SubLinkCard } from "@/components/profile/SubLinkCard.js";
import DiscordWidget from "@/components/widgets/DiscordWidget";

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
    return <div className="text-white text-center mt-24">Page not found.</div>;
  }
  const user = await User.findOne({ email: page.owner });
  if (!user) {
    return <div className="text-white text-center mt-24">User not found.</div>;
  }

  await Event.create({ type: 'view', uri: uri });
  const views = await Event.countDocuments({ type: 'view', uri: uri });

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

      <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
        <div className="animate-fade-in-up flex flex-col items-center gap-6 w-full max-w-md">
          
          <LinkCard
            user={user}
            page={page}
            buttonsIcons={buttonsIcons}
            buttonLink={buttonLink}
            views={views}
          />

          {/* Section to display the Discord Widget */}
          {page.discordServerId && (
            // --- THIS IS THE ONLY CHANGE ---
            // Added `flex justify-center` to this div to center the widget inside it.
            <div className="w-full flex justify-center">
              <DiscordWidget serverId={page.discordServerId} />
            </div>
          )}

          {page.links && page.links.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              {page.links.map(link => (
                <SubLinkCard key={link.url} link={{...link, pageUri: page.uri}} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
