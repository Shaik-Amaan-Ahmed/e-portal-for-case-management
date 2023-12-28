const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const efiling = require("../models/eFilingModel");

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
        const data = await efiling.find({}).select('plaintDetails');
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


module.exports = router;