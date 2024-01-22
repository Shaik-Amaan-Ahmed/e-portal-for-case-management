const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const efiling = require("../models/eFilingModel");
const approvedcases = require("../models/approvedCases");
const judges = require("../models/judges");
const nodemailer = require("nodemailer");
const multer = require("multer");
const sendEmail = require("../mail-helper/notification-mail");
require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/",
  upload.fields([
    { name: "petition", maxCount: 1 },
    { name: "aadhar", maxCount: 1 },
  ]),
  async (req, res) => {
    const data = req.body;

    const generateRegistrationId = () => {
      let year = new Date().getFullYear().toString().substr(2, 2); // Get the last two digits of the current year
      let prefix = "HCT";
      let randomString = Math.random().toString(36).substr(2, 10); // Generate a random string of 10 characters

      let caseId = year + prefix + randomString;
      return caseId;
    };

    const regId = generateRegistrationId();

    try {
      const data = JSON.parse(req.body.details);
      const caseId = regId;
      const newEfiling = new efiling({
        caseId: caseId,
        email: data.email,
        status: data.status,
        registrationDate: data.registrationDate,
        plaintDetails: data.storedPlaintDetails,
        plaintiffDetails: data.storedPlaintiffDetails,
        defendantDetails: data.storedDefendantDetails,
        docDetails: {
          petition: {
            filename: req.files.petition[0].originalname,
            contentType: req.files.petition[0].mimetype,
            fileData: req.files.petition[0].buffer,
          },
          aadhar: {
            filename: req.files.aadhar[0].originalname,
            contentType: req.files.aadhar[0].mimetype,
            fileData: req.files.aadhar[0].buffer,
          },
        },
      });
      await newEfiling.save();
      try {
        sendEmail(data.email, "Case Registration", "<h1>Your case has been registered successfully. Your case id is" + caseId+"</h1>");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "fail" });
    }
  }catch(error){
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

router.post("/reject-case", async (req, res) => {
  const id = req.body.id;
  const reasonforrejection = req.body.reasonforrejection;

  try {
    const data = await efiling.findOneAndUpdate(
      { caseId: id }, // find a document with this id
      {
        status: "Rejected",
        reasonforrejection: reasonforrejection,
      },
      { new: true } // return the updated document
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

let currentJudgeIndex = 0;
router.post("/approve-case", async (req, res) => {
  const id = req.body.id;
  const caseSensitivity = req.body.caseSensitivity;

  if(caseSensitivity === "High"){ 
    try{
      const data = await efiling.findOneAndUpdate(
        { caseId: id }, // find a document with this id
        {
          status: "Pending for review by judge",
          caseSensitivity: caseSensitivity,
        },
        { new: true } // return the updated document
      );
      res.status(200).json({ message: "success" });
    }catch(error){
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
    return;
  }

  try {
    const caseData = await efiling.findOne({ caseId: id });

    const judge = await judges.aggregate([
      {
        $match: {
          availability: true,
          casePreferences: { $in: [caseData.plaintDetails.caseCategory] },
        },
      },
      {
        $addFields: {
          numCases: { $size: { $ifNull: ["$cases", []] } },
        },
      },
      {
        $sort: { numCases: 1 },
      },
      {
        $project: {
          name: 1,
          numCases: 1,

        },
      }
    ]);

    if (judge.length === 0) {
      res.status(400).json({ message: "No judges available" });
    } else {
      const judgeName = judge[0].name;
      console.log(judgeName);

      try {
        const data = await efiling.findOneAndUpdate(
          { caseId: id }, // find a document with this id
          {
            status: "Pending for review by judge",
            caseSensitivity: caseSensitivity,
            judgeAssigned: judgeName,
          },
          { new: true } // return the updated document
        );

        const judgeData = await judges.findOneAndUpdate(
          { name: judgeName }, // find a document with this name
          {
            $push: { cases: id },
          },
          { new: true } // return the updated document
        );

        res.status(200).json({ message: "success" });
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/judge-approve", async (req, res) => { 
  const id = req.query.id;
  try{
    const data = await efiling.findOneAndUpdate(
      { caseId: id }, // find a document with this id
      {
        status: "Approved by judge and pending for summons",
      },
      { new: true } // return the updated document
    );
    if(data) {
      const newApprovedCase = new approvedcases(data.toObject());
      await newApprovedCase.save();
      if(newApprovedCase){ 
        res.status(200).json({ message: "success" });
      }
      else{
        res.status(400).json({ message: "fail-new" });
      }
      
    }
    else{
      res.status(400).json({ message: "fail" });
    }
    
  }catch(error){
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
