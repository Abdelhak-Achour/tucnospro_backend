import express from "express";
import { CategoryModel } from "../modules/categories.js";
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router()

router.post("/", verifyToken, async (req,res) => {})

export { router as categoryRouter}