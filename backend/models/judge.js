const mongoose = require('mongoose');
const {Schema} = mongoose

const judgeSchema = new Schema({
    username:{
      type: String,
      required : true
    },
    password:{
      type: String,
      required : true
    },

  });
  module.exports = mongoose.model('judges',judgeSchema);