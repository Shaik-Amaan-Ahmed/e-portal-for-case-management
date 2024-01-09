const mongoose = require("mongoose");
const CaseCategory = require("../models/caseCategory");
const router = require("./sendCaseDetails");

router.get("/", async (req, res) => { 
    try {
        const data = await CaseCategory.find();
        if(data.length > 0){
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

module.exports = router;