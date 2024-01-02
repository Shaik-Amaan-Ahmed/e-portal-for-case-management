const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/docs");
//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../files');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const docSchema = mongoose.model("documents");
const upload = multer({ storage: storage });
router.post('e-filing/upload', upload.any(), async (req, res) => {
    const titlePetition = req.body.title[0];
    const petitionName = req.file[0].filename;
    const aadharName = req.file[1].filename;
    const titleAadhar = req.body.title[1];
    try {
        await docSchema.create({petitionTitle:titlePetition, petitionFile:petitionName, aadharTitle:titleAadhar, aadharFile:aadharName});
        res.send({status:"ok"});
    } catch (error) {
        res.json({status:error});
        
    }
    res.send("hii");
});

