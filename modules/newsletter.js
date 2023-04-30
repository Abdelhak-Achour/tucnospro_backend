import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

export const NewsletterModel = mongoose.model("newsletters", NewsletterSchema)