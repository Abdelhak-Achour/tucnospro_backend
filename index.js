import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MDBLINK);

app.listen(3001, () => console.log("TucnosPro server up and running"));