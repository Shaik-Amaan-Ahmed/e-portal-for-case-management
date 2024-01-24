const mongoose = require("mongoose");
const feedbacks = mongoose.model("feedbacks", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
}));

module.exports = feedbacks;
