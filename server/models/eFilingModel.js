const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const efiling = new Schema({ 
    email: {type : String, required: true},
    status: {type: String},
    nextHearingDate: {type: Date},
    plaintDetails: {
        causeTitlePlaintiff: {type: String},
        causeTitleDefendant: {type: String},
        caseType: {type: String},
        caseCategory: {type: String},
        caseSubCategory:{type: String},
        numberOfPlaintiff: {type: String},
        numberOfRespondent: {type: String},
    },
    plaintiffDetails: {
        plaintiffType: {type : String},
        plaintiffName: {type : String},
        plaintiffRelation: {type : String},
        plaintiffParentSpouseName: {type : String},
        plaintiffDeadMinor: {type : String},
        plaintiffDOB:{type: Date},
        plaintiffAge: {type: Number},
        plaintiffGender: {type : String},
        plaintiffEmail: {type : String},
        plaintiffPhone: {type : String},
        plaintiffAddress: {type : String},
        plaintiffCity: {type : String},
        plaintiffDistrict: {type : String},
        plaintiffState: {type : String},
        plaintiffCountry: {type : String},
        plaintiffPinCode: {type : String},
    },

    defendantDetails: { 
        defendantType: {type : String},
        defendantName: {type : String},
        defendantRelation: {type : String},
        defendantParentSpouseName: {type : String},
        defendantDeadMinor: {type : String},
        defendantDOB:{type: Date},
        defendantAge: {type: Number},
        defendantGender: {type : String},
        defendantEmail: {type : String},
        defendantPhone: {type : String},
        defendantAddress: {type : String},
        defendantCity: {type : String},
        defendantDistrict: {type : String},
        defendantState: {type : String},
        defendantCountry: {type : String},
        defendantPinCode: {type : String},
    },
    docDetails: {
        petitionBase64: {
            type: Buffer,
        },
        petitionTitle: {type: String},
        petitionFileName : {type: String},
        aadharBase64: {
            type: Buffer,
        },
        aadharTitle: {type: String},
        aadharFileName : {type: String},
    },
})

module.exports = mongoose.model('efiling', efiling);