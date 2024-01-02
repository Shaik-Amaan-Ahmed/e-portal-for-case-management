const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const efiling = require("../models/eFilingModel");
const caseCateg = require("../models/caseCategory")

router.get("/client-case-details/", async (req, res) => { 
    const email = req.query.email;
    try {
        const data = await efiling.find({email: email});
        if(data.length > 0){
            res.status(200).send(data);
        }
        else{
            res.status(400).json({message: "No data found for this email"});
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }

});

router.get('/registrar-case-details', async (req, res) => { 
    try {
        const data = await efiling.find({}).select(['plaintDetails','caseId']);
        if(data.length > 0){
            res.status(200).send(data);
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
});

router.get('/registrar-view-details', async (req, res) => { 
    const id = req.query.id;
    try {
        const data = await efiling.findById(id);
        if(data){
            res.status(200).send([data]);
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){ 
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

router.get('/registrar-view-documents', async (req, res) => { 
    const id = req.query.id;
    try {
        const data = await efiling.findById(id).select('docDetails');
        if(data){
            const petitionBase64 = Buffer.from(data.docDetails.petition.fileData).toString('base64');
            const aadharBase64 = Buffer.from(data.docDetails.aadhar.fileData).toString('base64');
            res.status(200).json({petition: petitionBase64, aadhar: aadharBase64, petitionName: data.docDetails.petition.filename, aadharName: data.docDetails.aadhar.filename});

        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){ 
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

router.get('/client-case-category', async (req,res) =>{
    try {
        const data = await caseCateg.find();
        if(data){
            res.status(200).send(data);
        }
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})




module.exports = router;