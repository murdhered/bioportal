// Path: app/(website)/pricing/page.js

'use client';

import { useState, useEffect, useRef } from 'react'; // 1. Import useEffect and useRef for animations
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar, faClock, faComments } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

// --- NEW: A custom hook for triggering animations when elements scroll into view ---
function useOnScreen(options) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // When the element is intersecting the viewport, set it to visible
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
}

// --- NEW: A reusable component to wrap sections that will be animated ---
// It accepts a `delay` prop for creating a staggered effect.
function AnimatedSection({ children, className = '', delay = '0ms' }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
            style={{ transitionDelay: isVisible ? delay : '0ms' }}
        >
            {children}
        </div>
    );
}


const plans = [
    {
        name: 'Free',
        price: { monthly: 0, yearly: 0 },
        description: 'For individuals and creators getting started.',
        features: [
            '1 BioPortal Page',
            'Unlimited Links',
            'Basic Analytics',
            'Standard Themes',
        ],
        isMostPopular: false,
        cta: 'Get Started Free',
        isComingSoon: false,
    },
    {
        name: 'Pro',
        price: { monthly: 6, yearly: 60 },
        description: 'For professionals and growing businesses.',
        features: [
            'Everything in Free, plus:',
            '3 BioPortal Pages',
            'Advanced Analytics',
            'Premium Themes',
            'Dynamic Widgets (Roblox, etc.)',
            'Remove BioPortal Branding',
        ],
        isMostPopular: true,
        cta: 'Coming Soon',
        isComingSoon: true,
    },
    {
        name: 'Enterprise',
        price: { monthly: 25, yearly: 250 },
        description: 'For large organizations and teams.',
        features: [
            'Everything in Pro, plus:',
            'Unlimited Pages',
            'Team Management',
            'Custom Domain',
            'API Access',
            'Priority Support',
        ],
        isMostPopular: false,
        cta: 'Coming Soon',
        isComingSoon: true,
    },
];

function FaqItem({ question, answer }) {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 text-lg">{question}</h3>
            <p className="text-gray-600 mt-2">{answer}</p>
        </div>
    );
}


export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    return (
        <div className="bg-slate-50 py-12 pt-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* --- UPDATED: Header Section is now animated --- */}
                <AnimatedSection className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                        Find the Plan That&apos;s Right For You
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Start for free and scale up as you grow. No hidden fees.
                    </p>
                </AnimatedSection>

                {/* --- UPDATED: Toggle Switch is now animated with a delay --- */}
                <AnimatedSection delay="200ms" className="mt-10 flex justify-center items-center gap-4">
                    <span className={`font-medium ${billingCycle === 'monthly' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                    ${billingCycle === 'yearly' ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                                         transition duration-200 ease-in-out
                                         ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'}`}
                        />
                    </button>
                    <span className={`font-medium ${billingCycle === 'yearly' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        Yearly
                        <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                            Save 20%
                        </span>
                    </span>
                </AnimatedSection>

                {/* --- UPDATED: Pricing Cards now have a staggered animation --- */}
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <AnimatedSection key={plan.name} delay={`${300 + index * 150}ms`}>
                            <div
                                className={`relative bg-white border rounded-2xl shadow-lg p-8 flex flex-col h-full
                                            ${plan.isMostPopular ? 'border-4 border-indigo-500' : 'border-gray-200'}`}
                            >
                                {/* ... rest of the card content remains the same ... */}
                                {plan.isMostPopular && !plan.isComingSoon && (
                                    <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                                        <span className="bg-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
                                            <FontAwesomeIcon icon={faStar} className="mr-2"/>
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                 {plan.isComingSoon && (
                                    <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                                        <span className="bg-gray-700 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">
                                            <FontAwesomeIcon icon={faClock} className="mr-2"/>
                                            Coming Soon
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-4 text-gray-500 h-12">{plan.description}</p>
                                <div className="mt-6">
                                    <span className={`text-5xl font-extrabold text-gray-900 ${plan.isComingSoon ? 'text-gray-400' : ''}`}>
                                        ${plan.price[billingCycle]}
                                    </span>
                                    <span className="text-lg font-medium text-gray-500">
                                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                    </span>
                                </div>
                                <ul className="mt-8 space-y-4 text-left flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.isComingSoon ? '#' : '/login'}
                                    className={`mt-10 block w-full py-3 px-6 text-center rounded-lg text-lg font-semibold
                                                transition-transform hover:scale-105
                                                ${plan.isMostPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}
                                                ${plan.isComingSoon ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:scale-100' : ''}`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* --- UPDATED: FAQ section is now animated --- */}
                <AnimatedSection delay="500ms" className="mt-24 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                     <p className="text-gray-500 mt-2">
                        Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
                    </p>
                </AnimatedSection>
                <div className="max-w-3xl mx-auto mt-8 grid md:grid-cols-2 gap-6 text-left">
                    <AnimatedSection delay="600ms">
                        <FaqItem
                            question="What happens when paid plans launch?"
                            answer="When paid plans are launched, you will have the option to upgrade your account. Your existing content will remain, and you will unlock new features corresponding to the plan you choose."
                        />
                    </AnimatedSection>
                    <AnimatedSection delay="700ms">
                         <FaqItem
                            question="Is the Free plan really free forever?"
                            answer="Yes! We are committed to providing a powerful free service for creators. The core features you use today will always be part of the free plan."
                        />
                    </AnimatedSection>
                    <AnimatedSection delay="600ms">
                         <FaqItem
                            question="Can I customize my page URL?"
                            answer="Custom domain support (e.g., links.yourname.com) will be a feature included in the Enterprise plan when it becomes available."
                        />
                    </AnimatedSection>
                    <AnimatedSection delay="700ms">
                         <FaqItem
                            question="How do analytics work?"
                            answer="We provide simple, privacy-first analytics that show you how many people view your page and click your links, without using invasive trackers."
                        />
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}