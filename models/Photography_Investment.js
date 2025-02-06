const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photographyInvestmentSchema = new Schema({
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

  },



});

const photographyInvestment = mongoose.model('photographyInvestment', photographyInvestmentSchema);

module.exports = photographyInvestment;
