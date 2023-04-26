import express from "express";
import { BlogModel } from "../modules/blogs.js";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middlewares/verify.js";
import { CategoryModel } from "../modules/categories.js";
import date from 'date-and-time';

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

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    
    try
    {
        var category = await CategoryModel.findById(id);
    }
    catch (err)
    {
        return res.sendStatus(404);
    }

    try{
        const blogs = await BlogModel.find({category: category.name});
        res.json({blogs: blogs});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.get("/post/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const blog = await BlogModel.findById(id);
        console.log(blog);
        res.json({blog: blog});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/comment", async (req, res) => {
    const {id, username, comment} = req.body;

    const now = new Date();
    const dateNtime = date.format(now, "HH:mm, DD/MM/YYYY");

    try{
        const blog = await BlogModel.findById(id);
        blog.comments.push({username: username, date:  dateNtime, comment: comment});
        await blog.save();
        res.json({message: "blog comments updated"})
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
    const {title, content, category} = req.body;
    const image = req.file.filename;
    const comments = []

    const now = new Date();
    const dateNtime = date.format(now, "DD/MM/YYYY");

    const newTemoin = new BlogModel({title: title, content: content, date: dateNtime, category: category, image: image, comments: comments});
    await newTemoin.save();

    res.json({message: "blog saved"});
});

router.put("/", verifyToken, upload.single("image"), async (req, res) => {
    try
    {
        const {blogId, title, content, category} = req.body;
        const blog = await BlogModel.findById(blogId);
        const image = req.file.filename;

        if(title != "")
        {
            blog.title = title;
        }
        if(content != "")
        {
            blog.content = content;
        }
        if(category != "")
        {
            blog.category = category;
        }

        blog.image = image;

        await blog.save();

        res.json({message: "blog updated"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/noimage", verifyToken, async (req, res) => {
    try
    {
        const {blogId, title, content, category} = req.body;
        const blog = await BlogModel.findById(blogId);

        if(title != "")
        {
            blog.title = title;
        }
        if(content != "")
        {
            blog.content = content;
        }
        if(category != "")
        {
            blog.category = category;
        }

        await blog.save();

        res.json({message: "blog updatd"});
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
        await BlogModel.findByIdAndDelete(id);
        res.json({message: "blog deleted"});
    }
    catch(err)
    {
        res.json(err);
    }
})

export { router as blogRouter };