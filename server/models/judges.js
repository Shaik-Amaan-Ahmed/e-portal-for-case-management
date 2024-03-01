const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const Judge = mongoose.model("judges", new Schema({ 
    name: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String},
    password: {type:String},
    phone: {type: String, required: true},
    casePreferences: [{type : String}],
    cases: [{
        caseId: {type: String},
        status: {type: String},
    }],
    schedule: {
        monday: {
            cases: [{type:String,}],
        },
        tuesday: {type: String},
        wednesday: {type: String},
        thursday: {type: String},
        friday: {type: String},
        saturday: {type: String},
    },
    availability: {type:Boolean,default:true},
}));

module.exports = Judge;
