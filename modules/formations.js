import mongoose from "mongoose";

const FormationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    long_description: {
        type: String,
        required: true
    },
    formateur: {
        type: String,
        required: true
    },
    formateur_image: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    objectif: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    tools: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inscriptions: [{
        lastname: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        address: {
            type: String
        },
        phonenumber: {
            type: String
        },
        situation: {
            type: String
        },
        studieslvl: {
            type: String
        },
        studiesspecific: {
            type: String
        },
        speciality: {
            type: String
        },
        type: {
            type: String
        },
        contactmethod: {
            type: String
        },
        questions: {
            type: String
        },
        date: {
            type: String
        }
    }],
    comments: [{
        username: {
            type: String
        },
        date: {
            type: String
        },
        comment: {
            type: String
        }
    }]
});

export const FormationModel = mongoose.model("formations", FormationSchema)