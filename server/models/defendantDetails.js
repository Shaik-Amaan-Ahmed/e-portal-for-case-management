const express = require("express");
const mongoose = require("mongoose");

const DefendantDetails = mongoose.model("defendantDetails", new mongoose.Schema({ 

    caseId:{type: String, required: true},
    password: {type: String, required: true},

}));

module.exports = DefendantDetails;