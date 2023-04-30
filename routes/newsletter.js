import express from "express";
import { verifyToken } from "../middlewares/verify.js";
import { NewsletterModel } from "../modules/newsletter.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try
    {
        const emails = await NewsletterModel.find();
        res.json({emails: emails});
    }
    catch(err)
    {
        res.json(err);
    }
})

router.post("/", async (req, res) => {
    const {email} = req.body;

    const newMessage = new NewsletterModel({email});
    await newMessage.save();

    res.json({message: "subbed to newsletter"});
})

export { router as newsletterRouter };