const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Judge = mongoose.model("judges", new Schema({ 
    username: String,
    password: String
    
}));

module.exports = Judge;
