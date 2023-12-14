const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const ClientData = mongoose.model("clientData", new Schema({ 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true },
    phoneNumber: {type: String, required: true },
    dateOfBirth: {type: String, required: true },
}));

module.exports = ClientData;