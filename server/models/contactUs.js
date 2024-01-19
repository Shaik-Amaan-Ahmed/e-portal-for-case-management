const mongoose = require("mongoose");
const contactUs = mongoose.model("contactUs", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
}));

module.exports = contactUs;
