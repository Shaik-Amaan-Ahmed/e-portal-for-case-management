const express = require("express");
const router = express.Router();
const clientData = require("../models/clientData");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, password,phoneNumber, dateOfBirth } = req.body;
  const newClient = new clientData({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
  });
  const isuser = 0;
  const user = await clientData.findOne({
    email: email,
    phoneNumber: phoneNumber,
  });
  try {
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
        await newClient.save();
        res.status(200).json({ message: "User registered" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: "Error occurred"});
  }
});

module.exports = router;
