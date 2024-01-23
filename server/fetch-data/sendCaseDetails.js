const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const efiling = require("../models/eFilingModel");
const caseCateg = require("../models/caseCategory")
const judges = require("../models/judges");
const approvedcases = require("../models/approvedCases");


//client dashboard details
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
                {'caseId': new RegExp(search, 'i')},
                {'plaintDetails.causeTitlePlaintiff': new RegExp(search, 'i')},
                {'status': new RegExp(search, 'i')},
                {'plaintDetails.caseCategory': new RegExp(search, 'i')},
                {'registrationDate': new RegExp(search, 'i')}
                ]
            
            })
                .select(['plaintDetails','caseId','status','registrationDate']).
                skip(skip).limit(limit);
        } 

        else {
            data = await efiling.find({ email: email }).select(['plaintDetails','caseId','status','registrationDate']).skip(skip).limit(limit);
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

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';

        try{
        let data;

        const totalCount = await efiling.countDocuments({status:"Pending for approval by court"});

        if(search){ 
            data = await efiling.find({status:"Pending for approval by court", 
            $or: [
                {'caseId': new RegExp(search, 'i')},
                {'plaintDetails.causeTitlePlaintiff': new RegExp(search, 'i')},
                {'plaintDetails.causeTitleDefendant': new RegExp(search, 'i')},
                {'registrationDate': new RegExp(search, 'i')}
                ]
            }).select(['plaintDetails','caseId','registrationDate']).skip(skip).limit(limit);
        }
        
        else{
            data = await efiling.find({status: "Pending for approval by court"}).select(['plaintDetails','caseId','registrationDate']).skip(skip).limit(limit);
        }
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

router.get('/registrar-allocation-of-cases', async (req, res) => {
    try {
        const data = await efiling.find({caseSensitivity:"High", status:"Pending for review by judge"}).select(['plaintDetails.caseCategory','plaintDetails.caseSubCategory','caseId','caseSensitivity']);
        if(data.length > 0){
            res.status(200).json({data:data});
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch(error){
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

router.get('/registrar-view-petition', async (req, res) => {
    const id=req.query.id;
    try{
        const data = await efiling.findOne({caseId: id}).select('docDetails');
        if(data){
            const petitionBase64 = Buffer.from(data.docDetails.petition.fileData).toString('base64');
            res.status(200).json({petition: petitionBase64, petitionName: data.docDetails.petition.filename});
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
router.get('/registrar-view-petition-summons', async (req, res) => {
    const id=req.query.id;
    try{
        const data = await approvedcases.findOne({caseId: id}).select('docDetails');
        if(data){
            const petitionBase64 = Buffer.from(data.docDetails.petition.fileData).toString('base64');
            res.status(200).json({petition: petitionBase64, petitionName: data.docDetails.petition.filename});
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
router.get('/registrar-view-judges', async (req, res) => {
    const caseCategory = req.query.caseCategory;
    try{
        const data = await judges.find({availability: true, casePreferences: {$in : [caseCategory]}}).select(['name','cases']);
        // const data = await judges.find({availability: true}).select(['name','cases']);
        if(data){
            res.status(200).json({data:data});
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//judge case details
router.get('/judge-review-case-details', async (req, res) => { 
    const email = req.query.email;

    try{
        const judge = await judges.findOne({email: email});
        if(judge){
            const caseIds = judge.cases.map(caseObj => caseObj.caseId);
            const data = await efiling.find({caseId: {$in: caseIds},status:"Pending for review by judge"}).select(['plaintDetails','caseId','status','registrationDate','caseSensitivity']);
            if(data.length> 0){
                res.status(200).json({data:data});
            }
            else{
                res.status(400).json({message: "No data found"});
            }
        }
    }catch(error){
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
//registrar case details from approved cases pending for summons
router.get('/send-summons', async (req, res) => { 
    try{
    const data = await approvedcases.find({status:"Approved by judge and pending for summons"}).select(['caseId','registrationDate','status','plaintDetails','judgeAssigned']);
    if(data){
        res.status(200).json({data:data});
    }
    else{
        res.status(400).json({message: "No data found"});
    }
}catch(error){ 
    console.log(error.message);
    res.status(500).json({message: error.message});

}
})
//details to be filled in summon and showing petition in summons modal
router.get('/send-summons-details', async (req, res) => { 
    const id = req.query.id;
    try {
        const data = await approvedcases.findOne({caseId: id}).select(['defendantDetails','docDetails.petition']);
        if(data){
            res.status(200).json({data:data});
        }
        else{
            res.status(400).json({message: "No data found"});
        }

    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    
    }
})
router.get('/defendant-case-details', async (req, res) => { 
    const caseId = req.query.caseId;
    try {
        const data = await approvedcases.findOne({caseId: caseId}).select(['plaintDetails','caseId','status','registrationDate']);
        if(data){
            res.status(200).json({data:[data]});
        }
        else{
            res.status(400).json({message: "No data found"});
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;