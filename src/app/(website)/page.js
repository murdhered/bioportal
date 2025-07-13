// app/page.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name?.split(' ')[0] || 'User';

  const HEADER_HEIGHT_PX = '64px'; 

  return (
    <>
      <section
  style={{ paddingTop: HEADER_HEIGHT_PX }}
  className="relative w-screen h-screen px-4 md:px-8 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-900"
>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 animate-fade-in-down">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
    Your Digital Hub.
  </span><br />
  <span className="text-white">All In One Link.</span>
</h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-down delay-200">
                Simplify your online presence. Share your social profiles, websites, contact info, and more on a single, beautifully designed, and customizable page.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4 animate-fade-in-down delay-400">
                <a
                  href={session?.user ? "/account" : "/login"}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  {session?.user ? "Go to Dashboard" : "Get Started Free"}
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center px-8 py-3 border border-indigo-200 dark:border-indigo-700 text-base font-medium rounded-full text-indigo-700 dark:text-indigo-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  See How It Works
                </a>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in-up delay-600 transform transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                {session?.user ? `Welcome back, ${userName}!` : 'Create Your Personalized Page'}
              </h2>
              <HeroForm user={session?.user} />
              <p className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                {session?.user
                  ? "Continue managing your links and customizing your profile."
                  : "Join thousands simplifying their online presence. It's quick, easy, and completely free!"}
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section id="how-it-works" className="w-full bg-white dark:bg-gray-800 py-20 md:py-28 px-4 md:px-8 shadow-inner">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 dark:text-gray-100 animate-fade-in-up">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-200">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">1. Create Your Page</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up in seconds and claim your unique, memorable link. No credit card required.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899l4 4a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m-4.724-1.298a.75.75 0 010 1.06l-.744.744a.75.75 0 01-1.06 0l-.744-.744a.75.75 0 010-1.06l.744-.744a.75.75 0 011.06 0l.744.744z"></path></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">2. Add Your Links</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily add all your social media profiles, websites, portfolios, and contact information.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-600">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.882 12.686 9 12 9 12s.118-.686.316-1.342m0 2.684a2 2 0 100-2.684m0 2.684c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 2.684c-.818 0-1.5-.682-1.5-1.5s.682-1.5 1.5-1.5m0 2.684c-.54 0-1-.46-1-1s.46-1 1-1m0 2.684c-1.657 0-3-1.343-3-3s1.343-3 3-3m0 2.684C10.54 12.686 11 12 11 12s.46-.686.916-1.342"></path></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">3. Share Everywhere</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your unique link on social media bios, emails, business cards, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl animate-fade-in-left">
              <img
                src="/profile.PNG"
                alt="Customizable profile page example"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 text-white text-xl font-bold">
                Design Your Unique Digital Identity
              </div>
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left animate-fade-in-right delay-200">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Stunning & Customizable Profiles
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Choose from beautiful templates, customize colors, fonts, and backgrounds to perfectly match your brand or personality. Make your page truly yours.
              </p>
              <ul className="text-md text-gray-700 dark:text-gray-200 space-y-3 list-disc list-inside">
                <li>🎨 Vast theme library and color options</li>
                <li>✍️ Custom fonts and typography controls</li>
                <li>🖼️ Add custom backgrounds and profile pictures</li>
                <li>📊 Integrated analytics to track performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="text-center lg:text-left animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Analytics for your profile
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Understand your audience better with insightful data on clicks, views, and traffic sources. Optimize your links for maximum impact.
              </p>
              <ul className="text-md text-gray-700 dark:text-gray-200 space-y-3 list-disc list-inside">
                <li>📈 Real-time link click tracking</li>
                <li>⏰ Daily, weekly, monthly performance reports</li>
                <li>🔗 Track individual link performance</li>
              </ul>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl animate-fade-in-right delay-200">
              <img
                src="analytics.PNG"
                alt="Analytics dashboard example"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 text-white text-xl font-bold">
                Gain Insights, Grow Your Reach
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 py-20 md:py-28 px-4 md:px-8 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Take Control of Your Digital Identity?
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 animate-fade-in-up delay-200">
            Join thousands of creators, professionals, and businesses simplifying their online presence.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up delay-400">
            <a
              href={session?.user ? "/account" : "/login"}
              className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-xl text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
            >
              {session?.user ? "Manage My Page" : "Get Your Free Link Now!"}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-4 border border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </>
  );
}