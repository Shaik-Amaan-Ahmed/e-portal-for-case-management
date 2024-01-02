const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const CaseCategory = mongoose.model("caseCategory", new Schema({
    categoryCode : { type: String, required: true },
    category : { 
        categoryName : {type: String, required: true },
        subCategory : {type: Array, required: true},
    }
}));

module.exports = CaseCategory;