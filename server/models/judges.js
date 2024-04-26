const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const NoteSchema = new mongoose.Schema({
    date: String,
    note: String
});

const Judge = mongoose.model("judges", new Schema({ 
    name: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String},
    password: {type:String},
    phone: {type: String, required: true},
    mandals: [{type: String}],
    role: {type: String},
    cases: [{
        caseId: {type: String},
        status: {type: String},
    }],
    notes: {
        type: Object,
        default: {}
    },
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
