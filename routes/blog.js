import express from "express";
import { BlogModel } from "../modules/blogs.js";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middlewares/verify.js";

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
        const blogs = await BlogModel.find();
        res.json({blogs: blogs});
    }
    catch (err)
    {
        console.log(err);
        res.json(err);
    }
})

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const {title, content, date, category} = req.body;
    const image = req.file.filename;
    const comments = []

    const newTemoin = new BlogModel({title, content, date, category, image, comments});
    await newTemoin.save();

    res.json({message: "blog saved"});
});

export { router as blogRouter };