// Create this new file at: src/components/page-views/AboutPageClient.js

'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPalette,
    faLink,
    faChartSimple,
    faCubes,
    faHeart,
    faArrowRight,
    faWrench, 
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function useOnScreen(options) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);
        const currentRef = ref.current;
        if (currentRef) { observer.observe(currentRef); }
        return () => { if (currentRef) { observer.unobserve(currentRef); } };
    }, [ref, options]);
    return [ref, isVisible];
}

function AnimatedSection({ children, className = '' }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
        >
            {children}
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-block p-4 bg-indigo-600/20 text-indigo-400 rounded-full mb-4">
                <FontAwesomeIcon icon={icon} className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400 mt-2">{description}</p>
        </div>
    );
}

export default function AboutPageClient({ session }) {
    return (
        <div className="bg-slate-900 text-white">
            <main className="max-w-4xl mx-auto px-6 space-y-28 pb-24 pt-32 sm:pt-40">


                <AnimatedSection className="text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 text-transparent bg-clip-text">
                        Our Mission.
                    </h1>
                    <p className="text-slate-300 text-lg mt-6 max-w-2xl mx-auto">
                        We believe in a simple, elegant, and open internet. BioPortal was born from a desire to give creators, developers, and individuals a powerful, free tool to consolidate their digital presence without compromise.
                    </p>
                </AnimatedSection>


                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">Everything You Need. Nothing You Don&apos;t.</h2>
                        <p className="text-slate-400 mt-2">A powerful feature set, completely free of charge.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard icon={faPalette} title="Full Customization" description="Take control with custom backgrounds, colors, and layouts to perfectly match your brand."/>
                        <FeatureCard icon={faLink} title="Unlimited Links" description="Add as many links as you need. We don&apos;t believe in limits for your content."/>
                        <FeatureCard icon={faChartSimple} title="Visitor Analytics" description="Understand your audience with simple, privacy-focused analytics on views and clicks."/>
                        <FeatureCard icon={faCubes} title="Dynamic Widgets" description="Bring your page to life by embedding dynamic content from other platforms."/>
                    </div>
                </AnimatedSection>


                <AnimatedSection>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center flex flex-col items-center">
                        <div className="p-4 bg-green-600/20 text-green-400 rounded-full mb-4">
                            <FontAwesomeIcon icon={faHeart} className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Built for the Community, by the Community.</h2>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                            BioPortal is proudly open-source. This means anyone can view the code, suggest improvements, and contribute to its future. We believe in transparency and the power of collaboration.
                        </p>
                        <Link
                            href="https://github.com/murdhered/bioportal"
                            target="_blank"
                            className="mt-6 inline-flex items-center gap-3 bg-slate-700 text-white font-semibold py-3 px-6 rounded-full hover:bg-slate-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                            <span>View on GitHub</span>
                        </Link>
                    </div>
                </AnimatedSection>
                

                <AnimatedSection className="text-center">
                    {session ? (
                        <div>
                            <h2 className="text-4xl font-bold text-white">Welcome Back!</h2>
                            <p className="text-slate-400 mt-2">Ready to tweak your page? Let&apos;s go.</p>
                            <Link href="/account" className="inline-flex items-center gap-2 mt-6 bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform hover:scale-105">
                                <FontAwesomeIcon icon={faWrench} />
                                <span>Manage Your Page</span>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-4xl font-bold text-white">Ready to Build Your Hub?</h2>
                            <Link href="/login" className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform hover:scale-105">
                                <span>Create Your Page for Free</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    )}
                </AnimatedSection>

            </main>
        </div>
    );
}