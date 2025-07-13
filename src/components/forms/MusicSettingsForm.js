// Path: src/components/forms/MusicSettingsForm.js

'use client';

import { saveSoundCloudUrl } from "@/actions/pageActions"; 
import SubmitButton from "@/components/buttons/SubmitButton";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons"; 
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export default function MusicSettingsForm({ page }) {
    
    async function handleSubmit(formData) {
        const result = await saveSoundCloudUrl(formData);
        
        if (result?.error) {
            toast.error(result.error);
        }
        if (result?.success) {
            toast.success(result.success);
        }
    }

    return (
        <form action={handleSubmit}>
            <div className="bg-white p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-2">Background Music</h2>
                <p className="text-gray-500 mb-6">Add a SoundCloud track to play as ambient music on your page. Leave blank to disable.</p>
                
                <div className="bg-slate-100 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="musicUrlIn">
                        SoundCloud Track URL
                    </label>
                    <div className="flex items-center gap-2 bg-white p-2 border rounded-lg shadow-sm">
                        <FontAwesomeIcon icon={faSoundcloud} className="text-orange-500 w-6 h-6 ml-2" />
                        <input
                            id="musicUrlIn"
                            name="soundCloudUrl" 
                            type="text"
                            placeholder="e.g., https://soundcloud.com/artist/track-name"
                            defaultValue={page.soundCloudUrl}
                            className="w-full p-2 outline-none"
                        />
                    </div>
                </div>

                <div className="mt-6 border-t pt-6 flex justify-end">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save Settings</span>
                    </SubmitButton>
                </div>
            </div>
        </form>
    );
}
