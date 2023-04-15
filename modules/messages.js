import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    sujet: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateNtime: {
        type: String,
        required: true
    }
});

export const MessageModel = mongoose.model("messages", MessageSchema)