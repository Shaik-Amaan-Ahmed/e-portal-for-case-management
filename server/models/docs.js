const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    Documents: {
        petitionFile: {pdf: String},
        petitionTitle: {type: String},
        aadharFile:{pdf: String},
        aadharTitle: {type: String},
    },


})

module.exports = mongoose.model('documents', docsSchema);