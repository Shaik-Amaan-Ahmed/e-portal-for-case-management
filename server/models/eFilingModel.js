const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const efiling = new Schema({ 
    email: {type : String, required: true},
    caseId: {type: String, required: true},
    status: {type: String},
    caseSensitivity: {type: String},
    registrationDate: {type: String},
    reasonforrejection: {type: String},
    rejectedDate: {type: String},
    registrarApprovedDate: {type: String},
    judgeAssigned: {type: String},
    judgeAssignedDate: {type: String},
    judgeApprovedDate: {type: String},
    summonedDate:{type: String},
    writtenStatementSubmittedDate: {type: String},
    courtRoomAssigned: {type: String},
    nextHearingDate: {type: Date},
    plaintDetails: {
        causeTitlePlaintiff: {type: String},
        causeTitleDefendant: {type: String},
        caseType: {type: String},
        caseCategory: {type: String},
        caseSubCategory:{type: String},
        numberOfPlaintiff: {type: String},
        numberOfDefendants: {type: String},
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
      petition: {  
        filename: {type: String},
        contentType : {type : String},
        fileData: {type : Buffer}
      },
      aadhar: {
        filename: {type: String},
        contentType : {type : String},
        fileData: {type : Buffer}
      },
      summon: {
        filename: {type: String},
        contentType : {type : String},
        fileData: {type : Buffer}
      },
      writtenStatement: {
        filename: {type: String},
        contentType : {type : String},
        fileData: {type : Buffer}
      },
    },
    notifications: {
      judgements: {
        judgementDate: {type: Date},
        judgement: {type: String},
        judgementFile: {
          filename: {type: String},
          contentType : {type : String},
          fileData: {type : Buffer}
        }
      }
    }
})

module.exports = mongoose.model('efiling', efiling);