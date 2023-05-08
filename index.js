import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import dotenv from "dotenv";
import { contactRouter } from "./routes/contact.js";
import { temoinRouter } from "./routes/temoin.js";
import { blogRouter } from "./routes/blog.js";
import { categoryRouter } from "./routes/category.js";
import { partnerRouter } from "./routes/partner.js";
import { formationRouter } from "./routes/formation.js";
import { newsletterRouter } from "./routes/newsletter.js";
import { statsRouter } from "./routes/statistics.js";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/contact", contactRouter);
app.use("/about", temoinRouter);
app.use("/blog", blogRouter);
app.use("/category", categoryRouter);
app.use("/partner", partnerRouter);
app.use("/formation", formationRouter);
app.use("/newsletter", newsletterRouter);
app.use("/stats", statsRouter);

mongoose.connect(process.env.MDBLINK);

app.listen(3001, () => console.log("TucnosPro server up and running"));