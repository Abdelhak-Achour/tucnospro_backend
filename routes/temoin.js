import express from "express";
import multer from "multer";
import path from "path";
import { TemoinModel } from "../modules/temoins.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../tucnospro/src/images');
    },
    filename: (req, file, callback) => {
        console.log(file);
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.get("/temoin", async (req, res) => {
    try{
        const temoins = await TemoinModel.find();
        res.json({testimonies: temoins});
    }
    catch (err)
    {
        console.log(err);
        res.json(err);
    }
})

router.post("/temoin", upload.single("image"), async (req, res) => {
    const {nom, prenom, fonction, note, temoigne} = req.body;
    const image = req.file.filename;

    const newTemoin = new TemoinModel({nom, prenom, fonction, note, temoigne, image});
    await newTemoin.save();

    res.json({message: "temoin saved"});
});

export { router as temoinRouter };