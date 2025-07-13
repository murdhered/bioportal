'use client';

import { savePageButtons } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import {
    faDiscord, faFacebook, faGithub, faInstagram, faTelegram, 
    faTiktok, faWhatsapp, faYoutube, faPinterest, faSpotify, 
    faTwitch, faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";

const phoneValidation = {
  type: 'tel',
  pattern: '^\\+?[0-9]+$',
  title: "Enter numbers only, with an optional leading '+' for the country code (e.g., +1234567890)."
};

export const allButtons = [
    { key: 'email', label: 'e-mail', icon: faEnvelope, placeholder: 'test@example.com', validation: { type: 'email' } },
    { key: 'mobile', label: 'mobile', icon: faMobile, placeholder: '+1234567890', validation: phoneValidation },
    { key: 'instagram', label: 'instagram', icon: faInstagram, urlPrefix: 'https://instagram.com/', validation: { type: 'url' } },
    { key: 'facebook', label: 'facebook', icon: faFacebook, urlPrefix: 'https://facebook.com/', validation: { type: 'url' } },
    { key: 'discord', label: 'discord', icon: faDiscord, placeholder: 'your_username' },
    { key: 'tiktok', label: 'tiktok', icon: faTiktok, urlPrefix: 'https://tiktok.com/@', validation: { type: 'url' } },
    { key: 'youtube', label: 'youtube', icon: faYoutube, urlPrefix: 'https://youtube.com/', validation: { type: 'url' } },
    { key: 'whatsapp', label: 'whatsapp', icon: faWhatsapp, urlPrefix: 'https://wa.me/', placeholder: 'https://wa.me/yourphonenumber', validation: { type: 'url' } },
    { key: 'github', label: 'github', icon: faGithub, urlPrefix: 'https://github.com/', validation: { type: 'url' } },
    { key: 'telegram', label: 'telegram', icon: faTelegram, urlPrefix: 'https://t.me/', validation: { type: 'url' } },
    { key: 'spotify', label: 'spotify', icon: faSpotify, urlPrefix: 'https://open.spotify.com/user/', validation: { type: 'url' } },
    { key: 'pinterest', label: 'pinterest', icon: faPinterest, urlPrefix: 'https://pinterest.com/', validation: { type: 'url' } },
    { key: 'twitch', label: 'twitch', icon: faTwitch, urlPrefix: 'https://twitch.tv/', validation: { type: 'url' } },
    { key: 'linkedin', label: 'linkedin', icon: faLinkedin, urlPrefix: 'https://linkedin.com/in/', validation: { type: 'url' } },
];

function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ page }) {
    const pageSavedButtons = Object.keys(page.buttons || {}).map(k => allButtons.find(b => b.key === k)).filter(Boolean);
    const [activeButtons, setActiveButtons] = useState(pageSavedButtons);
    const [buttonValues, setButtonValues] = useState(page.buttons || {});

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => [...prevButtons, button]);
        setButtonValues(prevValues => {
            return {
                ...prevValues,
                [button.key]: button.urlPrefix || '',
            };
        });
    }
    
    async function save() {
        // --- THIS IS THE FIX ---
        // 1. Create a new object that will hold the values in the correct order.
        const orderedButtonValues = {};
        // 2. Loop through `activeButtons` (which IS correctly ordered) to build the new object.
        activeButtons.forEach(button => {
            // We only add the button if it has a value, to keep data clean.
            if (buttonValues[button.key]) {
                orderedButtonValues[button.key] = buttonValues[button.key];
            }
        });
        // 3. Send the new, correctly ordered object to the server.
        await savePageButtons(orderedButtonValues);
        
        toast.success('Settings saved!');
    }

    function handleInputChange(key, value) {
        setButtonValues(prevValues => {
            return {
                ...prevValues,
                [key]: value,
            };
        });
    }

    function removeButton({ key: keyToRemove }) {
        setActiveButtons(prevButtons =>
            prevButtons.filter(button => button.key !== keyToRemove)
        );
        setButtonValues(prevValues => {
            const newValues = {...prevValues};
            delete newValues[keyToRemove];
            return newValues;
        });
    }

    const availableButtons = allButtons.filter(
        b1 => !activeButtons.find(b2 => b1.key === b2.key)
    );

    return (
        <SectionBox>
            <form action={save}>
                <h2 className="text-2xl font-bold mb-4">Social & Contact Buttons</h2>
                <p className="text-gray-500 mb-6">Add, remove, and reorder your buttons.</p>
                
                <ReactSortable
                    handle=".handle"
                    list={activeButtons}
                    setList={setActiveButtons}
                    className="space-y-4"
                >
                    {activeButtons.map(b => (
                        <div key={b.key} className="p-4 bg-white border rounded-lg flex items-center gap-4 shadow-sm">
                            <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                                <FontAwesomeIcon icon={faGripLines} className="cursor-grab handle text-gray-400" />
                                <FontAwesomeIcon icon={b.icon} className="w-5 h-5" />
                                <span className="font-medium">{upperFirst(b.label)}</span>
                            </div>

                            <div className="flex-grow">
                                <input
                                    placeholder={b.placeholder || b.urlPrefix || 'Enter your link or contact info'}
                                    name={b.key}
                                    value={buttonValues[b.key] || ''}
                                    onChange={ev => handleInputChange(b.key, ev.target.value)}
                                    type={b.validation?.type || 'text'}
                                    pattern={b.validation?.pattern}
                                    title={b.validation?.title}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    onClick={() => removeButton(b)}
                                    type="button"
                                    className="py-2 px-4 bg-gray-200 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                    title="Remove this button"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>

                <div className="mt-6 border-t pt-6">
                     <h3 className="text-lg font-semibold mb-2 text-gray-700">Add a button</h3>
                     <div className="flex flex-wrap gap-2">
                        {availableButtons.map(b => (
                            <button
                                key={b.key}
                                type="button"
                                onClick={() => addButtonToProfile(b)}
                                className="flex items-center gap-2 py-2 px-3 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
                            >
                                <FontAwesomeIcon icon={b.icon} />
                                <span className="font-medium">{upperFirst(b.label)}</span>
                                <FontAwesomeIcon icon={faPlus} className="w-3 h-3"/>
                            </button>
                        ))}
                     </div>
                </div>
                
                <div className="max-w-xs mx-auto mt-8 border-t pt-6 flex justify-center">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}
