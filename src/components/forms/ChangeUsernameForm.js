// Path: src/components/forms/ChangeUsernameForm.js

'use client';

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faSpinner, faSave } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { updateUsername } from "@/actions/pageActions";
import grabUsername from "@/actions/grabUsername";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";

const reservedUsernames = ['account', 'pricing', 'login', 'analytics', 'music', 'leaderboard', 'about'];

export default function ChangeUsernameForm({ page }) {
    const [username, setUsername] = useState(page.uri || '');
    const [debouncedUsername] = useDebounce(username, 500);
    
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        const checkUsername = async () => {
            if (debouncedUsername === page.uri) {
                setIsAvailable(null);
                setValidationError('');
                return;
            }

            if (debouncedUsername.length >= 1 && !validationError) {
                setIsChecking(true);
                setIsAvailable(null);
                
                const formData = new FormData();
                formData.set('username', debouncedUsername);
                formData.set('checkOnly', 'true');
                const result = await grabUsername(formData);

                setIsAvailable(result);
                setIsChecking(false);
            } else {
                setIsAvailable(null);
            }
        };
        checkUsername();
    }, [debouncedUsername, validationError, page.uri]);

    async function handleSubmit(formData) {
        const usernameValue = formData.get('username');
        if (validationError || reservedUsernames.includes(usernameValue)) {
            toast.error('This username is not allowed.');
            return;
        }

        const result = await updateUsername(formData);
        if (result.error) {
            toast.error(result.error);
        }
        if (result.success) {
            toast.success(result.success);
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

    function getFeedbackIcon() {
        if (isChecking) return <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-400"/>;
        if (validationError) return <FontAwesomeIcon icon={faExclamationCircle} className="text-orange-500"/>;
        if (isAvailable === true) return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500"/>;
        if (isAvailable === false) return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500"/>;
        return null;
    }

    return (
        <SectionBox>
            <form action={handleSubmit}>
                <h2 className="text-2xl font-bold mb-2">Change Username</h2>
                <p className="text-gray-500 mb-6">Update your public URL.</p>
                
                <label htmlFor="usernameChangeInput" className="block text-sm font-medium text-gray-700 mb-1">
                    bioport.al/
                </label>
                <div className="relative">
                    <input
                        id="usernameChangeInput"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="block w-full p-4 pl-4 pr-12 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        type="text"
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
                        <p className="text-gray-500">Checking...</p>
                    ) : null}
                </div>

                <div className="mt-6 border-t pt-6 flex justify-end">
                    <SubmitButton disabled={!!validationError || isAvailable === false || isChecking || username === page.uri}>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Update Username</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}
