const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Client = mongoose.model("clients", new Schema({ 
    username: String,
    password: String
    
}));

module.exports = Client;
