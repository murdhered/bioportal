// Path: app/(website)/contact/page.js

'use client';

import { useState, useEffect, useRef } from 'react'; // 1. Import useEffect and useRef for animations
import { sendContactEmail } from '@/actions/emailActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faMapMarkerAlt, faEnvelope, faPhone, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '@/components/buttons/SubmitButton';
import { faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

// --- NEW: A custom hook for triggering animations when elements scroll into view ---
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


export default function ContactPage() {
    const [formState, setFormState] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSessionStatus() {
            try {
                const response = await fetch('/api/session');
                const data = await response.json();

                if (data.isLoggedIn && data.user) {
                    setName(data.user.name || '');
                    setEmail(data.user.email || '');
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Failed to fetch session status:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSessionStatus();
    }, []);


    async function handleSubmit(formData) {
        const result = await sendContactEmail(formData);
        setFormState(result);
    }

    if (formState?.success) {
        return (
            <div className="pt-32 max-w-xl mx-auto my-12 text-center p-8 bg-white rounded-xl shadow-lg border">
                <FontAwesomeIcon icon={faCheckCircle} className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800">Message Sent!</h1>
                <p className="text-gray-600 mt-2">
                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                </p>
                <button 
                    onClick={() => setFormState(null)} 
                    className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 pt-32 px-4 pb-16">
            <div className="max-w-5xl mx-auto">
                <AnimatedSection className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800">Get in Touch</h1>
                    <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
                        Have a question, a feature request, or just want to say hello? We&apos;d love to hear from you.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* --- UPDATED: Column 1 is now animated --- */}
                    <AnimatedSection delay="200ms">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border h-full">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form or use one of the methods below to reach us.
                            </p>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-indigo-500" />
                                    <span>Queluz, Lisbon, Portugal</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-indigo-500" />
                                    <span>micaellobato530@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-indigo-500" />
                                    <span>+351 962 324 684</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t flex gap-4">
                                <Link href="https://x.com/murdhered" target="_blank" className="text-gray-400 hover:text-indigo-600 transition-colors"><FontAwesomeIcon icon={faXTwitter} size="2x"/></Link>
                                <Link href="https://instagram.com/cxge" target="_blank" className="text-gray-400 hover:text-indigo-600 transition-colors"><FontAwesomeIcon icon={faInstagram} size="2x"/></Link>
                                <Link href="https://github.com/murdhered/bioportal" target="_blank" className="text-gray-400 hover:text-indigo-600 transition-colors"><FontAwesomeIcon icon={faGithub} size="2x"/></Link>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* --- UPDATED: Column 2 is now animated --- */}
                    <AnimatedSection delay="400ms">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl border">
                            <form action={handleSubmit} className="space-y-6">
                                {isLoggedIn && (
                                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg flex items-center gap-3 text-sm">
                                        <FontAwesomeIcon icon={faUserCheck} />
                                        <span>You are logged in. Your details have been pre-filled.</span>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input id="name" name="name" type="text" required
                                        className="block w-full p-3 bg-slate-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 read-only:bg-slate-200 read-only:cursor-not-allowed"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        readOnly={isLoading || isLoggedIn}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                    <input id="email" name="email" type="email" required
                                        className="block w-full p-3 bg-slate-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 read-only:bg-slate-200 read-only:cursor-not-allowed"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        readOnly={isLoading || isLoggedIn}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" name="message" required rows={5}
                                        className="block w-full p-3 bg-slate-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Your message..."></textarea>
                                </div>
                                {formState?.error && (
                                    <p className="text-red-500 text-sm text-center">{formState.error}</p>
                                )}
                                <div>
                                    <SubmitButton>
                                        <span>Send Message</span>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </SubmitButton>
                                </div>
                            </form>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}
