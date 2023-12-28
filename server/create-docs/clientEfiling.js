const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const efiling = require("../models/eFilingModel");

router.post("/", async (req, res) => { 
    
    const data = req.body;
    const newEfiling = new efiling({
        email: data.email,
        plaintDetails: data.storedPlaintDetails,
        plaintiffDetails: data.storedPlaintiffDetails,
        defendantDetails: data.storedDefendantDetails,
        docDetails: data.storedDocumentDetails
    })

    try {
        const savedEfiling = await newEfiling.save();
        res.status(200).json({message: "success"});
    }catch(err){
        console.log(err.message);
    }

})

module.exports = router;