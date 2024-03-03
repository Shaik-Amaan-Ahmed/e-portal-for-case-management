const express = require("express");
const router = express.Router();
const judges = require("../models/judges");



router.get("/judge-dash-details", async (req, res) => { 
    const email = req.query.email;
    try {
        const judgeDetails = await judges.findOne({email: email});
        const totalCases = judgeDetails.cases.length;
        const activeCases = judgeDetails.cases.filter((item) => item.status==="Summoned the defendant and pending for written statement"||"Defendant has submitted the written statement and pending for review by judge).length").length;

        res.status(200).json({message: "success", data: {totalCases: totalCases, activeCases: activeCases}});

    } catch (error) {
        res.status(400).json({message: "failed", error: error});
    }
})

module.exports = router;