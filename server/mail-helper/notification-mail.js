const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
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

  async function sendEmail(to, subject, html) {
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: subject,
      html: html,
    };
  try{
    let info = await transporter.sendMail(mailOptions, async (err, data) => { 
        if (err) {
            console.log(err.message);
            res.status(500).send("Error " + err);
          } else {
            res.status(200).json({ message: "Success" });
            console.log("Email sent successfully");
          }
          console.log("Message sent: %s", info.messageId);
    });
}catch(error){ 
    console.log(error.message);
    res.status(500).json({ message: error.message });
}
    
  }
  
  module.exports = sendEmail;