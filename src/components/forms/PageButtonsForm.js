'use client';

import { savePageButtons } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import {
    faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube
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
    { key: 'instagram', label: 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/username', validation: { type: 'url' } },
    { key: 'facebook', label: 'facebook', icon: faFacebook, placeholder: 'https://facebook.com/username', validation: { type: 'url' } },
    { key: 'discord', label: 'discord', icon: faDiscord, placeholder: 'https://discord.gg/invite_code', validation: { type: 'url' } },
    { key: 'tiktok', label: 'tiktok', icon: faTiktok, placeholder: 'https://tiktok.com/@username', validation: { type: 'url' } },
    { key: 'youtube', label: 'youtube', icon: faYoutube, placeholder: 'https://googleusercontent.com/youtube.com/0...', validation: { type: 'url' } },
    { key: 'whatsapp', label: 'whatsapp', icon: faWhatsapp, placeholder: '+1234567890', validation: phoneValidation },
    { key: 'github', label: 'github', icon: faGithub, placeholder: 'https://github.com/username', validation: { type: 'url' } },
    { key: 'telegram', label: 'telegram', icon: faTelegram, placeholder: 'https://t.me/username', validation: { type: 'url' } },
];

function upperFirst(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ user, page }) {
    const pageSavedButtonsKeys = Object.keys(page?.buttons ?? {});
    const pageSavedButtonsInfo = pageSavedButtonsKeys
        .map(k => allButtons.find(b => b.key === k))
        .filter(Boolean);

    const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => [...prevButtons, button]);
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
    }

    function removeButton({ key: keyToRemove }) {
        setActiveButtons(prevButtons =>
            prevButtons.filter(button => button.key !== keyToRemove)
        );
    }

    const availableButtons = allButtons.filter(
        b1 => !activeButtons.find(b2 => b1.key === b2.key)
    );

    if (!page) return <div>Loading...</div>;

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className="text-2xl font-bold mb-4">Social & Contact Buttons</h2>
                <p className="text-gray-500 mb-6">Add, remove, and reorder your buttons.</p>
                
                <ReactSortable
                    handle=".handle"
                    list={activeButtons}
                    setList={setActiveButtons}
                    className="space-y-4"
                >
                    {activeButtons.map(b => (
                        // --- UPDATED: The layout for each row is now fully responsive ---
                        // It will stack vertically on mobile and be horizontal on larger screens.
                        <div
                            key={b.key}
                            className="p-4 bg-white border rounded-lg shadow-sm
                                       flex flex-col gap-2
                                       md:flex-row md:items-center md:gap-4"
                        >
                            {/* The label container no longer has a fixed width */}
                            <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                                <FontAwesomeIcon
                                    icon={faGripLines}
                                    className="cursor-grab handle text-gray-400"
                                />
                                <FontAwesomeIcon icon={b.icon} className="w-5 h-5" />
                                <span className="font-medium">{upperFirst(b.label)}</span>
                            </div>

                            {/* This container still grows to fill the remaining space on larger screens */}
                            <div className="flex-grow flex items-center">
                                <input
                                    placeholder={b.placeholder || 'Enter your link or contact info'}
                                    name={b.key}
                                    defaultValue={page?.buttons?.[b.key] ?? ''}
                                    type={b.validation?.type || 'text'}
                                    pattern={b.validation?.pattern}
                                    title={b.validation?.title}
                                    required
                                    className="w-full p-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                                <button
                                    onClick={() => removeButton(b)}
                                    type="button"
                                    className="py-2 px-4 bg-gray-200 text-gray-600 border border-l-0 rounded-r-lg hover:bg-red-500 hover:text-white transition-colors"
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