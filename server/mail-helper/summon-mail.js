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

  async function sendSummonViaMail(to, subject, html,attachments,res) {
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments.map((attachment) => ({ 
        filename: attachment.filename,
        content: Buffer.from(attachment.content).toString('base64'),
        encoding: 'base64'
      })),
    };
  return new Promise((resolve,reject) => { 
    transporter.sendMail(mailOptions, async (err, data) => { 
        if (err) {
            console.log(err.message);

            reject(false);
          } else {
            console.log("Email sent successfully");
            resolve(true);
          }
    });
  }).catch((error) => { 
    console.log(error.message);
    return false;
  })
    
  }
  
  module.exports = sendSummonViaMail;