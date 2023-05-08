import mongoose from "mongoose";

const StatisticsSchema = new mongoose.Schema({
    visits: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export const StatisticsModel = mongoose.model("statistics", StatisticsSchema)