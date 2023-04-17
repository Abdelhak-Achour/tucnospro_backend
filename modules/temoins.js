import mongoose from "mongoose";

const TemoinSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    fonction: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    temoigne: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export const TemoinModel = mongoose.model("temoins", TemoinSchema)