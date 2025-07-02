// Create this new file at: src/models/Contact.js

import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

export const Contact = models?.Contact || model('Contact', ContactSchema);