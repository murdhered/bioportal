// Path: src/components/profile/SocialButton.js

'use client'; // This component is now interactive, so it must be a client component.

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the checkmark icon for feedback

// The component now accepts `buttonKey` and `value` props to handle special cases
export function SocialButton({ buttonKey, href, icon, value }) {
    const [copied, setCopied] = useState(false);

    // This function handles the copy-to-clipboard action
    const handleCopy = () => {
        if (!value) return; // Do nothing if there's no value
        
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            // Revert the "Copied!" feedback after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    // --- THIS IS THE NEW LOGIC ---
    // If the button is the special 'discord' button, render a <button> element.
    if (buttonKey === 'discord') {
        return (
            <button
                onClick={handleCopy}
                className="text-white/70 transition-opacity hover:text-white"
                title={`Copy Discord: ${value}`}
            >
                {/* Show a green checkmark if copied, otherwise show the original Discord icon */}
                {copied ? (
                    <FontAwesomeIcon className="w-6 h-6 text-green-400" icon={faCheck} />
                ) : (
                    <FontAwesomeIcon className="w-6 h-6" icon={icon} />
                )}
            </button>
        );
    }

    // For all other buttons, render a normal link as before
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
