// Path: src/components/profile/SocialButton.js

'use client'; 
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the checkmark icon for feedback


export function SocialButton({ buttonKey, href, icon, value }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!value) return; 
        
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };


    if (buttonKey === 'discord') {
        return (
            <button
                onClick={handleCopy}
                className="text-white/70 transition-opacity hover:text-white"
                title={`Copy Discord: ${value}`}
            >
               
                {copied ? (
                    <FontAwesomeIcon className="w-6 h-6 text-green-400" icon={faCheck} />
                ) : (
                    <FontAwesomeIcon className="w-6 h-6" icon={icon} />
                )}
            </button>
        );
    }

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
