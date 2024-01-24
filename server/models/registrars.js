const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Registrar = mongoose.model("registrars", new Schema({ 
    name: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String},
    password: {type:String},
    phone: {type: String, required: true},
}));

module.exports = Registrar;