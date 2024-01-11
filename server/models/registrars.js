const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Registrar = mongoose.model("registrars", new Schema({ 
    username: String,
    password: String,
    token: {type: String},
    password: {type:String},
    phone: {type: String, required: true}
    
}));

module.exports = Registrar;