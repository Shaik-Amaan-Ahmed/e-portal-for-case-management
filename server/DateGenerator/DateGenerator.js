const express = require("express");
const router = express.Router()
const GenerateDate = () => {  // Generate date in format DD-MM-YYYY
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    const formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
}

module.exports = GenerateDate;