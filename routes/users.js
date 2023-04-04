import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../modules/users.js";
import dotenv from "dotenv";
import { verifyToken } from "../middlewares/verify.js";
dotenv.config()

const router = express.Router();

router.post("/register", verifyToken, async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(user)
    {
        return res.json({message: "User already exists"});
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({email, password: hashedpassword});
    await newUser.save();

    res.json({message: "user registered successfully"});
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    
    if(!user)
    {
        return res.json({message: "user doesn't exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid)
    {
        return res.json({message: "email or password incorrect"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWTSECRET);
    res.json({token: token, userID: user._id});
});

export { router as userRouter };