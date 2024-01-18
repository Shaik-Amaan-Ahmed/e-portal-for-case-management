const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const efiling = require("../models/eFilingModel");
const judges = require("../models/judges");
const multer = require("multer");
const nodemailer = require("nodemailer");
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
        
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          },
        });
        let mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: data.email,
          subject: "Case Registration",
          html: "<h1>Your Case has been registered successfully</h1> <p>Your case with case ID: <strong>" + caseId + "</strong><br>You can use this case id for future purposes...</p>",
        };
        transporter.sendMail(mailOptions, async (err, data) => {
          if (err) {
            console.log(err.message);
            res.status(500).send("Error " + err);
          } else {
            res.status(200).json({ message: "Success" });
            console.log("Email sent successfully");
          }
        });
      } catch (error) {
        console.log(error.message);
      }
      
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "fail" });
    }
  }
);

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

router.post("/approve-case", async (req, res) => {
  const id = req.body.id;
  const caseSensitivity = req.body.caseSensitivity;
  try {
    const data = await efiling.findOneAndUpdate(
      { caseId: id }, // find a document with this id
      {
        status: "Approved",
        caseSensitivity: caseSensitivity,
      },
      { new: true } // return the updated document
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.post('/send-registration-number', async (req, res) => {
    const email = data.email;

});
router.post("/registrar-assign-judge", async (req, res) => {
  const id=req.body.id;
  const judgeName=req.body.judgeName;
  try {
    const data = await efiling.findOneAndUpdate(
      {caseId: id}, // find a document with this id
      {
        judgeAssigned: judgeName,
        status: "Pending for hearing"
      },
      {new: true} // return the updated document
    );

    const judgeData = await judges.findOneAndUpdate(
      {name: judgeName}, // find a document with this name
      {
        $push: {cases: id}
      },
      {new: true} // return the updated document
    );

    res.status(200).json({message: "success"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
