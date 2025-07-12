// Path: app/page.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import Image from "next/image"; // Using next/image is a best practice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShareAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";


export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name?.split(' ')[0] || 'User';

  // Define your header height here. Ensure it matches your Header component's actual height.
  const HEADER_HEIGHT_PX = '80px'; // e.g., '80px' if your Header is h-20

  return (
    <>
      {/* --- Hero Section with a subtle light gray background --- */}
      <section
        style={{ paddingTop: HEADER_HEIGHT_PX }}
        className="relative w-full bg-slate-50 px-4 md:px-8 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left side: Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Your Digital Hub.
                </span><br />
                All In One Link.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Simplify your online presence. Share your social profiles, websites, contact info, and more on a single, beautifully designed, and customizable page.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href={session?.user ? "/account" : "/login"}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  {session?.user ? "Go to Dashboard" : "Get Started Free"}
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center px-8 py-3 border border-indigo-200 text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right side: Form card */}
            <div className="w-full max-w-md mx-auto lg:mx-0 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {session?.user ? `Welcome back, ${userName}!` : 'Create Your Personalized Page'}
              </h2>
              <HeroForm user={session?.user} />
              <p className="mt-8 text-sm text-center text-gray-500 leading-relaxed">
                {session?.user
                  ? "Continue managing your links and customizing your profile."
                  : "Join thousands simplifying their online presence. It's quick, easy, and completely free!"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "How It Works" Section - this part is now white for contrast --- */}
      <section id="how-it-works" className="w-full bg-white py-20 md:py-28 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faEdit} className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Create Your Page</h3>
              <p className="text-gray-600">
                Sign up in seconds and claim your unique, memorable link. No credit card required.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLink} className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Add Your Links</h3>
              <p className="text-gray-600">
                Easily add all your social media profiles, websites, portfolios, and contact information.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShareAlt} className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Share Everywhere</h3>
              <p className="text-gray-600">
                Share your unique link on social media bios, emails, business cards, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Feature Section - back to the light gray background --- */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/800x600/7F00FF/FFFFFF?text=Customizable+Page"
                alt="Customizable profile page example"
                width={800} height={600}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Stunning & Customizable Profiles
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Choose from beautiful templates, customize colors, fonts, and backgrounds to perfectly match your brand or personality. Make your page truly yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Analytics Section - back to white for contrast --- */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Analytics for your profile
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Understand your audience better with insightful data on clicks, views, and traffic sources. Optimize your links for maximum impact.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/800x600/6A0DAD/FFFFFF?text=Analytics+Dashboard"
                alt="Analytics dashboard example"
                width={800} height={600}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Final Call to Action --- */}
      <section className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 py-20 md:py-28 px-4 md:px-8 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Join thousands of creators, professionals, and businesses simplifying their online presence.
          </p>
          <div className="flex justify-center">
            <a
              href={session?.user ? "/account" : "/login"}
              className="inline-block px-10 py-4 text-lg font-medium rounded-full text-indigo-700 bg-white hover:bg-gray-100 transition-transform hover:scale-105"
            >
              {session?.user ? "Manage My Page" : "Get Your Free Link Now!"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
