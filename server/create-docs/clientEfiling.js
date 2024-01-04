const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const efiling = require("../models/eFilingModel");
const multer = require("multer");


router.post("/", async (req, res) => { 
    const data = req.body;
    
    try {
        const updatedEfiling = await efiling.findOneAndUpdate(
            { caseId: data.caseId }, // find a document with this email
            {
                plaintDetails: data.storedPlaintDetails,
                plaintiffDetails: data.storedPlaintiffDetails,
                defendantDetails: data.storedDefendantDetails,
                status: data.status,
                caseRegisteredDate: data.formattedDate
            },
            { new: true } // return the updated document
        );

        if (!updatedEfiling) {
            return res.status(404).json({ message: 'No e-filing found with this email' });
        }

        res.status(200).json({ message: "success"});
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

const upload = multer({storage: multer.memoryStorage()})


router.post('/upload-docs', upload.fields([{ name: 'petition', maxCount: 1 }, { name: 'aadhar', maxCount: 1 }]) ,async (req, res) => {
    
    const email = req.body.email;
    const caseId = req.body.caseId;

    try{
    const file = new efiling({
        email: email,
        caseId: caseId,
        docDetails:{
            petition : {
                filename: req.files.petition[0].originalname,
                contentType: req.files.petition[0].mimetype,
                fileData: req.files.petition[0].buffer
            },
            aadhar: {
                filename: req.files.aadhar[0].originalname,
                contentType: req.files.aadhar[0].mimetype,
                fileData: req.files.aadhar[0].buffer
            }
            }
    })
    await file.save()
    res.status(200).json({message: "Success"});
}catch (error) {
    console.error('Error:', error);
    res.status(500).json({message:  "fail"})
}
})



module.exports = router;