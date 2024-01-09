const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const efiling = require("../models/eFilingModel");
const multer = require("multer");


router.post("/", async (req, res) => { 
    const data = req.body;
    
    try {
        const newEfiling = new efiling({
            email: data.email,
            caseId: data.caseId,
            status: data.status,
            registrationDate: data.registrationDate,
            plaintDetails: data.storedPlaintDetails,
            plaintiffDetails: data.storedPlaintiffDetails,
            defendantDetails: data.storedDefendantDetails,
        });

        if (!newEfiling) {

            return res.status(404).json({ message: 'No e-filing found with this email' });
        }
        await newEfiling.save();

        res.status(200).json({ message: "success"});
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

const upload = multer({storage: multer.memoryStorage()})


router.post('/upload-docs', upload.fields([{ name: 'petition', maxCount: 1 }, { name: 'aadhar', maxCount: 1 }]) ,async (req, res) => {
    

    const caseId = req.body.caseId;

    try{
    const file = await efiling.findOneAndUpdate(
        {caseId: caseId},
        {docDetails:{
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
        },
        {new: true}
        
    )
    await file.save()
    res.status(200).json({message: "Success"});
}catch (error) {
    console.error('Error:', error);
    res.status(500).json({message:  "fail"})
}
})

router.post('/reject-case', async (req, res) => { 
    const id = req.body.id;
    const reasonforrejection = req.body.reasonforrejection;

    try {
        const data = await efiling.findOneAndUpdate(
            { caseId: id }, // find a document with this id
            {
                status: "Rejected",
                reasonforrejection: reasonforrejection
            },
            { new: true } // return the updated document
        );
        res.status(200).json({message: "success"});
        }catch (error){ 
            console.log(error.message);
            res.status(500).json({message: error.message});
        } 

})

router.post('/approve-case', async (req, res) => { 
    const id = req.body.id;

    try {
        const data = await efiling.findOneAndUpdate(
            { caseId: id }, // find a document with this id
            {
                status: "Approved",
            },
            { new: true } // return the updated document
        );
        res.status(200).json({message: "success"});
        }catch (error){ 
            console.log(error.message);
            res.status(500).json({message: error.message});
        } 

})


module.exports = router;