// Path: src/components/forms/UsernameForm.js

'use client';

import grabUsername from "@/actions/grabUsername";
import SubmitButton from "@/components/buttons/SubmitButton";
import RightIcon from "@/components/icons/RightIcon";
import { redirect } from "next/navigation"; // Note: this redirect will now not be used here
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const reservedUsernames = ['account', 'pricing', 'login', 'analytics', 'about'];

export default function UsernameForm({ desiredUsername }) {
    const [username, setUsername] = useState(desiredUsername || '');
    const [debouncedUsername] = useDebounce(username, 500); 
    
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        const checkUsername = async () => {
            if (debouncedUsername.length >= 1 && !validationError) {
                setIsChecking(true);
                setIsAvailable(null);
                
                // --- THIS IS THE FIX ---
                // We create a temporary FormData to ONLY CHECK the username.
                // We add the `checkOnly` flag.
                const formData = new FormData();
                formData.set('username', debouncedUsername);
                formData.set('checkOnly', 'true'); // This flag tells the server action not to save.
                
                const result = await grabUsername(formData);

                setIsAvailable(result);
                setIsChecking(false);
            } else {
                setIsAvailable(null);
            }
        };
        checkUsername();
    }, [debouncedUsername, validationError]);

    // The handleSubmit now simply passes the form data to the action.
    // The server action handles the creation and redirect.
    async function handleSubmit(formData) {
        const result = await grabUsername(formData);
        // We only need to handle the 'false' case for UI feedback.
        // On success, the server action will redirect automatically.
        if (result === false) {
            setIsAvailable(false);
        }
    }

    function handleUsernameChange(ev) {
        let value = ev.target.value;
        value = value.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9_.-]/g, '');

        if (reservedUsernames.includes(value)) {
            setValidationError('This username is reserved.');
        } else if (value.length > 0 && !/^[a-z]/.test(value)) {
            setValidationError('Must start with a letter.');
        } else {
            setValidationError('');
        }
        
        setUsername(value);
    }
    
    // ... getFeedbackIcon function remains the same ...
    function getFeedbackIcon() {
        if (isChecking) {
            return <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-400"/>;
        }
        if (validationError) {
            return <FontAwesomeIcon icon={faExclamationCircle} className="text-orange-500"/>;
        }
        if (isAvailable === true) {
            return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500"/>;
        }
        if (isAvailable === false) {
            return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500"/>;
        }
        return null;
    }

    return (
        <div className="bg-white shadow-xl rounded-2xl p-8 border max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                Claim Your Handle
            </h1>
            <p className="text-center mb-8 text-gray-500">
                Choose a unique username for your page.
            </p>
            <form action={handleSubmit}>
                <label htmlFor="usernameInput" className="block text-sm font-medium text-gray-700 mb-1">
                    bioport.al/
                </label>
                <div className="relative">
                    <input
                        id="usernameInput"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="
                            block w-full p-4 pl-4 pr-12 border border-gray-300 rounded-lg
                            text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            outline-none transition-all
                        "
                        type="text"
                        placeholder="your-username"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        {getFeedbackIcon()}
                    </div>
                </div>
                
                <div className="mt-2 text-center text-sm min-h-[1.25rem]">
                    {validationError ? (
                        <p className="text-orange-600 font-semibold">{validationError}</p>
                    ) : isAvailable === true ? (
                        <p className="text-green-600 font-semibold">Available!</p>
                    ) : isAvailable === false ? (
                        <p className="text-red-600 font-semibold">Sorry, this username is already taken.</p>
                    ) : isChecking ? (
                        <p className="text-gray-500">Checking availability...</p>
                    ) : null}
                </div>

                <div className="mt-6">
                    <SubmitButton disabled={!!validationError || isAvailable === false || isChecking}>
                        <span>Claim My Username</span>
                        <RightIcon />
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}