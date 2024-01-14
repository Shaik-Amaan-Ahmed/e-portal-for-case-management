const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Client = require("../models/clientData");  
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    const client = await Client.find

});