// Replace the code in this file: src/components/buttons/SubmitButton.js

'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = '' }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            // --- NEW, PRETTIER STYLES ---
            className={
                "w-full text-white font-bold py-3 px-6 rounded-lg " +
                "bg-gradient-to-r from-indigo-600 to-blue-500 " +
                "hover:from-indigo-700 hover:to-blue-600 " +
                "focus:ring-4 focus:ring-indigo-300 focus:outline-none " +
                "transition-all duration-300 transform hover:scale-[1.02] " +
                "disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:scale-100 "
                + className
            }
        >
            {pending ? (
                <span>Saving...</span>
            ) : (
                // This span ensures the icon and text inside are centered
                <span className="flex items-center justify-center gap-2">{children}</span>
            )}
        </button>
    );
}