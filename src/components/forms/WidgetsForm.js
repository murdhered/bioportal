'use client';

import { savePageWidgets } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import SectionBox from "@/components/layout/SectionBox"; // Assuming you use this

export default function WidgetsForm({ page }) {
    
    async function handleSubmit(formData) {
        const result = await savePageWidgets(formData);
        if (result) {
            toast.success('Widget settings saved!');
        } else {
            toast.error('Something went wrong.');
        }
    }

    return (
        <form action={handleSubmit}>
            <div className="bg-slate-100 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="discordIdIn">
                    Discord Server ID
                </label>
                <div className="flex items-center gap-2 bg-white p-2 border rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faDiscord} className="text-gray-400 w-6 h-6 ml-2" />
                    <input
                        id="discordIdIn"
                        name="discordServerId"
                        type="text"
                        placeholder="e.g., 123456789012345678"
                        defaultValue={page.discordServerId}
                        className="w-full p-2 outline-none"
                    />
                </div>
                {/* --- THIS IS THE FIX --- */}
                {/* Replaced the double quotes with &quot; */}
                <p className="text-xs text-gray-500 mt-2">
                    To find this, go to your Discord Server Settings &gt; Widget, and copy the &quot;Server ID&quot;.
                </p>
            </div>

            <div className="mt-6 border-t pt-6 flex justify-end">
                <SubmitButton>
                    <FontAwesomeIcon icon={faSave} />
                    <span>Save Widgets</span>
                </SubmitButton>
            </div>
        </form>
    );
}
