import express from "express";
import date from 'date-and-time';
import { StatisticsModel } from "../modules/statistics.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try
    {
        const statistics = await StatisticsModel.find();
        res.json({statistics: statistics});
    }
    catch(err)
    {
        res.json(err);
    }
})

router.post("/", async (req, res) => {
    const {visited, viewed} = req.body;

    const now = new Date();
    const dateNtime = date.format(now, "MM/YYYY");

    const newStat = new StatisticsModel({date: dateNtime});
    await newStat.save();

    res.json({message: "stats saved"});
})

export { router as statsRouter };