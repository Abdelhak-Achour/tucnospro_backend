import express from "express";
import { CategoryModel } from "../modules/categories.js";
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router()

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

router.post("/", verifyToken, async (req,res) => {
    const {name} = req.body;

    const category = await CategoryModel.findOne({name});
    if (category)
    {
        return res.json({message: "category already exists"});
    }

    const newCategory = new CategoryModel({name});
    await newCategory.save();

    res.json({message: "category saved"});
})

export { router as categoryRouter}