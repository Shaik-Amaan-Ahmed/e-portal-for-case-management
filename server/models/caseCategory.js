const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const CaseCategory = mongoose.model("caseCategory", new Schema({
    category : { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    }
}));

module.exports = CaseCategory;