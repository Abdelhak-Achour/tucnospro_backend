import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middlewares/verify.js";
import dateformater from 'date-and-time';
import { FormationModel } from "../modules/formations.js";
import { CategoryModel } from "../modules/categories.js";

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
        const formations = await FormationModel.find();
        res.json({formations: formations});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.get("/bycategory/:id", async (req, res) => {
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
        const formations = await FormationModel.find({category: category.name});
        res.json({formations: formations});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const formation = await FormationModel.findById(id);
        res.json({formation: formation});
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/comment", async (req, res) => {
    const {id, username, comment} = req.body;

    const now = new Date();
    const dateNtime = dateformater.format(now, "HH:mm, DD/MM/YYYY");

    try{
        const formation = await FormationModel.findById(id);
        formation.comments.push({username: username, date:  dateNtime, comment: comment});
        await formation.save();
        res.json({message: "formation comments updated"})
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/inscrire", async (req, res) => {
    const {id, lastname, name, email, address, phonenumber, situation, studieslvl, studiesspecific, speciality, type, contactmethod, questions} = req.body;

    const now = new Date();
    const dateNtime = dateformater.format(now, "HH:mm, DD/MM/YYYY");

    try{
        const formation = await FormationModel.findById(id);
        formation.inscriptions.push({
            lastname: lastname,
            name: name,
            email: email,
            address: address,
            phonenumber: phonenumber,
            situation: situation,
            studieslvl: studieslvl,
            studiesspecific: studiesspecific,
            speciality: speciality,
            type: type,
            contactmethod: contactmethod,
            questions: questions,
            date: dateNtime
        });
        await formation.save();
        res.json({message: "formation subs updated"})
    }
    catch (err)
    {
        res.json(err);
    }
})

router.post("/", verifyToken, upload.array("image"), async (req, res) => {
    const {name, price, date, duration, category, description, long_description, formateur, program, requirements, objectif, plan, tools, target} = req.body;
    const image = req.files[0].filename;
    const formateur_image = req.files[1].filename;
    const comments = [];
    const inscriptions = [];

    const newFormation = new FormationModel({
        name: name,
        price: price,
        date: date,
        duration: duration,
        category: category,
        description: description,
        long_description: long_description,
        formateur: formateur,
        formateur_image: formateur_image,
        program: program,
        requirements: requirements,
        objectif: objectif,
        plan: plan,
        tools: tools,
        target: target,
        image: image,
        inscriptions: inscriptions,
        comments: comments
    });

    await newFormation.save();

    res.json({message: "formation saved"});
});

router.put("/", verifyToken, upload.array("image"), async (req, res) => {
    try
    {
        const {formationId, name, price, date, duration, category, description, long_description, formateur, program, requirements, objectif, plan, tools, target} = req.body;
        const formation = await FormationModel.findById(formationId);

        if(name != "")
        {
            formation.name = name;
        }
        if(price != "")
        {
            formation.price = price;
        }
        if(date != "")
        {
            formation.date = date;
        }
        if(duration != "")
        {
            formation.duration = duration;
        }
        if(category != "")
        {
            formation.category = category;
        }
        if(description != "")
        {
            formation.description = description;
        }
        if(long_description != "")
        {
            formation.long_description = long_description;
        }
        if(formateur != "")
        {
            formation.formateur = formateur;
        }
        if(program != "")
        {
            formation.program = program;
        }
        if(requirements != "")
        {
            formation.requirements = requirements;
        }
        if(objectif != "")
        {
            formation.objectif = objectif;
        }
        if(plan != "")
        {
            formation.plan = plan;
        }
        if(tools != "")
        {
            formation.tools = tools;
        }
        if(target != "")
        {
            formation.target = target;
        }

        formation.image = req.files[0].filename;
        formation.formateur_image = req.files[1].filename;

        await formation.save();

        res.json({message: "formation updated"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/image", verifyToken, upload.single("image"), async (req, res) => {
    try
    {
        const {formationId, name, price, date, duration, category, description, long_description, formateur, program, requirements, objectif, plan, tools, target} = req.body;
        const formation = await FormationModel.findById(formationId);

        if(name != "")
        {
            formation.name = name;
        }
        if(price != "")
        {
            formation.price = price;
        }
        if(date != "")
        {
            formation.date = date;
        }
        if(duration != "")
        {
            formation.duration = duration;
        }
        if(category != "")
        {
            formation.category = category;
        }
        if(description != "")
        {
            formation.description = description;
        }
        if(long_description != "")
        {
            formation.long_description = long_description;
        }
        if(formateur != "")
        {
            formation.formateur = formateur;
        }
        if(program != "")
        {
            formation.program = program;
        }
        if(requirements != "")
        {
            formation.requirements = requirements;
        }
        if(objectif != "")
        {
            formation.objectif = objectif;
        }
        if(plan != "")
        {
            formation.plan = plan;
        }
        if(tools != "")
        {
            formation.tools = tools;
        }
        if(target != "")
        {
            formation.target = target;
        }

        formation.image = req.file.filename;

        await formation.save();

        res.json({message: "formation updated"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/formateurimage", verifyToken, upload.single("image"), async (req, res) => {
    try
    {
        const {formationId, name, price, date, duration, category, description, long_description, formateur, program, requirements, objectif, plan, tools, target} = req.body;
        const formation = await FormationModel.findById(formationId);

        if(name != "")
        {
            formation.name = name;
        }
        if(price != "")
        {
            formation.price = price;
        }
        if(date != "")
        {
            formation.date = date;
        }
        if(duration != "")
        {
            formation.duration = duration;
        }
        if(category != "")
        {
            formation.category = category;
        }
        if(description != "")
        {
            formation.description = description;
        }
        if(long_description != "")
        {
            formation.long_description = long_description;
        }
        if(formateur != "")
        {
            formation.formateur = formateur;
        }
        if(program != "")
        {
            formation.program = program;
        }
        if(requirements != "")
        {
            formation.requirements = requirements;
        }
        if(objectif != "")
        {
            formation.objectif = objectif;
        }
        if(plan != "")
        {
            formation.plan = plan;
        }
        if(tools != "")
        {
            formation.tools = tools;
        }
        if(target != "")
        {
            formation.target = target;
        }

        formation.formateur_image = req.file.filename;

        await formation.save();

        res.json({message: "formation updated"});
    }
    catch (err)
    {
        res.json(err)
    }
});

router.put("/noimage", verifyToken, async (req, res) => {
    try
    {
        const {formationId, name, price, date, duration, category, description, long_description, formateur, program, requirements, objectif, plan, tools, target} = req.body;
        const formation = await FormationModel.findById(formationId);

        if(name != "")
        {
            formation.name = name;
        }
        if(price != "")
        {
            formation.price = price;
        }
        if(date != "")
        {
            formation.date = date;
        }
        if(duration != "")
        {
            formation.duration = duration;
        }
        if(category != "")
        {
            formation.category = category;
        }
        if(description != "")
        {
            formation.description = description;
        }
        if(long_description != "")
        {
            formation.long_description = long_description;
        }
        if(formateur != "")
        {
            formation.formateur = formateur;
        }
        if(program != "")
        {
            formation.program = program;
        }
        if(requirements != "")
        {
            formation.requirements = requirements;
        }
        if(objectif != "")
        {
            formation.objectif = objectif;
        }
        if(plan != "")
        {
            formation.plan = plan;
        }
        if(tools != "")
        {
            formation.tools = tools;
        }
        if(target != "")
        {
            formation.target = target;
        }

        await formation.save();

        res.json({message: "formation updated"});
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
        await FormationModel.findByIdAndDelete(id);
        res.json({message: "formation deleted"});
    }
    catch(err)
    {
        res.json(err);
    }
})

export { router as formationRouter };