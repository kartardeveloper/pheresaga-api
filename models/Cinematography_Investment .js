const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinematographyInvestmentSchema = new Schema({
  heading:{
    type : String,
  },
  headingDetails:{
    type:String
  },
  title: {
    type: String,
    required: true,
    enum: ["Classic", "Elite", "Premium"]
  },
  description: {
    type: String,
    required: false,
    maxlength: 500
  },
  rate: {
    type: String,
  }


});

const cinematographyInvestment = mongoose.model('cinematographyInvestment', cinematographyInvestmentSchema);

module.exports = cinematographyInvestment;
