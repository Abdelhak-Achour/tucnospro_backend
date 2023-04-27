import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middlewares/verify.js";
import { PartnerModel } from "../modules/partner.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../tucnospro/src/images');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.get("/", async (req, res) => {
    try{
        const partners = await PartnerModel.find();
        res.json({partners: partners});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const {nom} = req.body;
    const image = req.file.filename;

    const newPartner = new PartnerModel({nom, image});
    await newPartner.save();

    res.json({message: "partner saved"});
});

export { router as partnerRouter };