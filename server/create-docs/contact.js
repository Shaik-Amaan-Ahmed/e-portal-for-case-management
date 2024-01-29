const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ContactUs = require("../models/feedbacks");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    const newContactUs = new ContactUs({
        name,
        email,
        message,
    });
    try {
        await newContactUs.save();
        res.status(200).send("Message sent successfully");
    } catch (err) {
        console.log(err.message);
    }
    });

module.exports = router;