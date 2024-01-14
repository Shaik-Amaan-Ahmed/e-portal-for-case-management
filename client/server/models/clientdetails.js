const express = require("express");
const mongoose = require("mongoose");

const ClientDetails = mongoose.model("clientDetails", new mongoose.Schema({ 
    email: { type: String, required: true },
    caseDetails: {
        caseCategory: { type: String, required: true },
        caseStatus: { type: String, required: true },
        caseTitle: { type: String, required: true },
        caseDescription: { type: String, required: true },
        nextCourtDate: { type: String},
        nextCourtTime: { type: String},
        nextCourtLocation: { type: String},
    }
}));