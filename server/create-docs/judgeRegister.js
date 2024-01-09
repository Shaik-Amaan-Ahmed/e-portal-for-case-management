const express = require("express");
const router = express.Router();
const Judge = require("../models/judges");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { name,email, phone, casePreferences } = req.body;

  const judge = await Judge.findOne({ email, name, phone });
  if (judge) {

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
  const token = crypto.randomBytes(20).toString("hex");

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Set Password",
    html: "<h1>Set Password</h1><p>Click <a href='http://localhost:3000/set-password?token=" + token + "'>here</a> to set password</p>",
  };



  transporter.sendMail(mailOptions, async (err, data) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
      try {

        const judge = await Judge.findOneAndUpdate(
          { email },//find the judge with this email
          { token ,
            casePreferences //update the token and casePreferences
          },
          { new: true } //return the updated document
        );
        res.status(200).send("Email sent successfully");
      } catch (error) {
        console.log(error.message);
      }
  });

}
else{
  res.status(400).send("Judge not found"); //if judge not found
}
})

router.post("/set-password", async (req, res) => { 
  const token = req.query.token;
  const { password } = req.body;
  const judge = await Judge.findOne({ token });
  if(judge) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const judge = await Judge.findOneAndUpdate(
        { token },
        { password :hashedPassword },
        { new: true }
      );
      judge.token = null;
      await judge.save();
      res.status(200).send("Password set successfully");
    } catch (error) {
      console.log(error.message);
    }
  } else { 
    res.status(400).send("Invalid token");
  }
})


module.exports = router;