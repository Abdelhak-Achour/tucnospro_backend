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
    const {name} = req.body;
    const image = req.file.filename;

    const newPartner = new PartnerModel({nom: name, image: image});
    await newPartner.save();

    res.json({message: "partner saved"});
});

router.put("/", verifyToken, upload.single("image"), async (req, res) => {
    try
    {
        const {partnerId, name} = req.body;
        const partner = await PartnerModel.findById(partnerId);
        const image = req.file.filename;

        if(name != "")
        {
            partner.nom = name;
        }

        partner.image = image;

        await partner.save();

        res.json({message: "partner updated"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/noimage", verifyToken, async (req, res) => {
    try
    {
        const {partnerId, name} = req.body;
        const partner = await PartnerModel.findById(partnerId);

        if(name != "")
        {
            partner.nom = name;
        }

        await partner.save();

        res.json({message: "partner updatd"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try
    {
        const {id} = req.params;
        await PartnerModel.findByIdAndDelete(id);
        res.json({message: "partner deleted"});
    }
    catch(err)
    {
        res.json(err);
    }
})

export { router as partnerRouter };