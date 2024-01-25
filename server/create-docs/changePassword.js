const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const sendEmail = require("../mail-helper/notification-mail");
require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ClientData = require("../models/clientData");

router.post("/", async (req, res) => {
    const user = await ClientData.findOne({
        email: req.body.email,
    });
    if (user) {
        const token = crypto.randomBytes(20).toString("hex");
        console.log(token);
        console.log(req.body.email);
        const newToken = await ClientData.findOneAndUpdate(
            {email: req.body.email},
            {token: token}, 
            {new: true});
        
        try {
            const suc = await sendEmail(req.body.email, "Change Password", "<h1>Change Password</h1><p>Click <a href='http://localhost:3000/client-change-password?token=" + token + "'>here</a> to change password</p>");
            if (suc) {
                res.status(200).json({ message: "Email sent successfully" });
            }
            else {
                res.status(400).json({ message: "Email not sent" });
            }
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json({ message: err.message });
        }
    }
});

router.post("/client-change-password", async (req, res) => {
    const token = req.query.token;
    const password = req.body.password;
    const client = await ClientData.findOne({ token });
    if (client) {
        try{
        const newPassword = await bcrypt.hash(password, 10);
        const client = await ClientData.findOneAndUpdate(
            { token },
            { password: newPassword },
            { new: true });
        client.token = null;
        await client.save();
        res.status(200).send("Password changed successfully");
        } catch (error) {
            console.log(error.message);
        }
    }
    else {
        res.status(400).send("Invalid Token");
    }
});


module.exports = router;


