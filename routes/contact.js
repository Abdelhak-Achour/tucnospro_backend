import express from "express";
import { MessageModel } from "../modules/messages.js";
import date from 'date-and-time';
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try
    {
        const messages = await MessageModel.find();
        res.json({messages: messages});
    }
    catch(err)
    {
        res.json(err);
    }
})

router.post("/", async (req, res) => {
    const {nom, prenom, sujet, message} = req.body;

    const now = new Date();
    const dateNtime = date.format(now, "HH:mm, DD/MM/YYYY");

    const newMessage = new MessageModel({nom, prenom, sujet, message, dateNtime});
    await newMessage.save();

    res.json({message: "message sent"});
})

export { router as contactRouter };