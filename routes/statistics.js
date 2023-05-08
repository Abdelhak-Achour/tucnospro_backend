import express from "express";
import date from 'date-and-time';
import { StatisticsModel } from "../modules/statistics.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try
    {
        const statistics = await StatisticsModel.find();
        res.json({stats: statistics});
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

    const statistics = await StatisticsModel.findOne({date: dateNtime});

    if(statistics)
    {
        const visits = statistics.visits;
        const views = statistics.views;

        if(visited)
        {
            statistics.visits = Number(visits) + 1;
        }
        if(viewed)
        {
            statistics.views = Number(views) + 1;
        }

        await statistics.save()
    }
    else
    {
        const newStat = new StatisticsModel({visits: 1, views: 1, date: dateNtime});
        await newStat.save();
    }

    res.json({message: "stats saved"});
})

export { router as statsRouter };