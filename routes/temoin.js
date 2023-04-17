import express from "express";
import multer from "multer";
import path from "path";

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

router.post("/temoin", upload.single("image"), async (req, res) => {
    console.log(req.file);
    const {nom, prenom, fonction, note, temoigne} = req.body;
    console.log({nom, prenom, fonction, note, temoigne});
    res.json({messaage: "check server console"});
});

export { router as temoinRouter };