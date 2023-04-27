import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export const PartnerModel = mongoose.model("partenaires", PartnerSchema)