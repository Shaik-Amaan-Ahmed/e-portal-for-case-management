const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const efiling = require("../models/eFilingModel");
const caseCateg = require("../models/caseCategory")

router.get("/client-case-details/", async (req, res) => { 
    const email = req.query.email;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    try {
        const totalCount = await efiling.countDocuments({email: email});
        let data;
        if (search) {
            data = await efiling.find({ 
                email: email, 
                $or: [
                {'plaintDetails.causeTitlePlaintiff': new RegExp(search, 'i')},
                {'status': new RegExp(search, 'i')},
                {'plaintDetails.caseType': new RegExp(search, 'i')}
                ]
            
            })
                .select(['plaintDetails','caseId','status']).
                skip(skip).limit(limit);
        } 

        else {
            data = await efiling.find({ email: email }).select(['plaintDetails','caseId','status']).skip(skip).limit(limit);
        }
        if(data.length > 0){
            res.status(200).json({data:data, totalCount: totalCount});
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const totalCount = await efiling.countDocuments({status: "Pending at court for approval"});
        const data = await efiling.find({status: "Pending at court for approval"}).select(['plaintDetails','caseId','registrationDate']).skip(skip).limit(limit).sort({registrationDate: -1});
        if(data.length > 0){
            res.status(200).json({data:data, totalCount: String(totalCount)});
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
        const data = await efiling.findOne({caseId : id});
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
        const data = await efiling.findOne({caseId: id}).select('docDetails');
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
        const data = await caseCateg.find({});
        if(data){
            res.status(200).send(data);
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})




module.exports = router;