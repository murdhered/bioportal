// Path: app/(website)/contact/page.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { sendContactEmail } from '@/actions/emailActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faMapMarkerAlt, faEnvelope, faPhone, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '@/components/buttons/SubmitButton';
import { faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="max-w-xl mx-auto text-center p-8 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-white">Message Sent!</h1>
                    <p className="text-slate-300 mt-2">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button 
                        onClick={() => setFormState(null)} 
                        className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
                    >
                        Send another message
                    </button>
                </div>
            </div>
        );
    }

    return (
        
        <div className="bg-slate-900 min-h-screen pt-32 px-4 pb-16">
            <div className="max-w-5xl mx-auto">
                <AnimatedSection className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white">Get in Touch</h1>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                        Have a question, a feature request, or just want to say hello? We&apos;d love to hear from you.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedSection delay="200ms">
                        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700 h-full">
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                            <p className="text-slate-400 mb-8">
                                Fill out the form or use one of the methods below to reach us.
                            </p>
                            <div className="space-y-4 text-slate-300">
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-indigo-400" />
                                    <span>Queluz, Lisbon, Portugal</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-indigo-400" />
                                    <span>micaellobato530@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-indigo-400" />
                                    <span>+351 962 324 684</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-700 flex gap-4">
                                <Link href="https://x.com/murdhered" target="_blank" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faXTwitter} size="2x"/></Link>
                                <Link href="https://instagram.com/cxge" target="_blank" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faInstagram} size="2x"/></Link>
                                <Link href="https://github.com/murdhered/bioportal" target="_blank" className="text-slate-400 hover:text-white transition-colors"><FontAwesomeIcon icon={faGithub} size="2x"/></Link>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay="400ms">
                        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700">
                            <form action={handleSubmit} className="space-y-6">
                                {isLoggedIn && (
                                    <div className="bg-blue-500/20 text-blue-300 p-3 rounded-lg flex items-center gap-3 text-sm border border-blue-500/30">
                                        <FontAwesomeIcon icon={faUserCheck} />
                                        <span>You are logged in. Your details have been pre-filled.</span>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                                    <input id="name" name="name" type="text" required
                                        className="block w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white read-only:bg-slate-800 read-only:cursor-not-allowed"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        readOnly={isLoading || isLoggedIn}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Your Email</label>
                                    <input id="email" name="email" type="email" required
                                        className="block w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white read-only:bg-slate-800 read-only:cursor-not-allowed"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        readOnly={isLoading || isLoggedIn}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                    <textarea id="message" name="message" required rows={5}
                                        className="block w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                                        placeholder="Your message..."></textarea>
                                </div>
                                {formState?.error && (
                                    <p className="text-red-400 text-sm text-center">{formState.error}</p>
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
