import express from "express";
import { CategoryModel } from "../modules/categories.js";
import { verifyToken } from "../middlewares/verify.js";
import multer from "multer";
import path from "path";

const router = express.Router()

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
    try
    {
        const categories = await CategoryModel.find();
        res.json({categories: categories});
    }
    catch (err)
    {
        console.log(err);
        res.json(err);
    }
})

router.post("/", verifyToken, upload.single("image"), async (req,res) => {
    const {name, description} = req.body;
    const image = req.file.filename;

    const category = await CategoryModel.findOne({name});
    if (category)
    {
        return res.json({message: "category already exists"});
    }

    const newCategory = new CategoryModel({name, description, image});
    await newCategory.save();

    res.json({message: "category saved"});
})

router.put("/", verifyToken, upload.single("image"), async (req, res) => {
    try
    {
        const {categoryId, name, description} = req.body;
        const image = req.file.filename;

        const category = await CategoryModel.findById(categoryId);

        if(name != "")
        {
            category.name = name;
        }
        if(description != "")
        {
            category.description = description;
        }

        category.image = image;

        await category.save();

        res.json({message: "category updatd"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/noimage", verifyToken, async (req, res) => {
    try
    {
        const {categoryId, name, description} = req.body;
        const category = await CategoryModel.findById(categoryId);

        if(name != "")
        {
            category.name = name;
        }
        if(description != "")
        {
            category.description = description;
        }

        await category.save();

        res.json({message: "category updatd"});
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
        await CategoryModel.findByIdAndDelete(id);
        res.json({message: "category deleted"});
    }
    catch(err)
    {
        res.json(err);
    }
})

export { router as categoryRouter}