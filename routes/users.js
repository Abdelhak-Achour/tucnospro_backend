import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../modules/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(user)
    {
        return res.json({message: "User already exists"});
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({username, password: hashedpassword});
    await newUser.save();

    res.json({message: "user registered successfully"});
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    
    if(!user)
    {
        res.json({message: "user doesn't exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid)
    {
        return res.json({message: "username or password incorrect"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWTSECRET);
    res.json({token: token, userID: user._id});
});

export { router as userRouter };