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

router.put("/", verifyToken, async (req, res) => {
    try
    {
        const {categoryId, name} = req.body;
        const category = await CategoryModel.findById(categoryId);

        if(name != "")
        {
            category.name = name;
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