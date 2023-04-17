import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import dotenv from "dotenv";
import { contactRouter } from "./routes/contact.js";
import { temoinRouter } from "./routes/temoin.js";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/contact", contactRouter);
app.use("/about", temoinRouter);

mongoose.connect(process.env.MDBLINK);

app.listen(3001, () => console.log("TucnosPro server up and running"));