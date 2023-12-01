const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Registrar = mongoose.model("registrars", new Schema({ 
    username: String,
    password: String
    
}));

module.exports = Registrar;