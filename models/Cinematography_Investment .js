const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cinematographyInvestmentSchema = new Schema({
  heading: {
    type: String,
  },
  headingDetails: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    enum: ["Classic", "Elite", "Premium"],
  },
  benifits: [
    {
      type: String,
      required: false,
      maxlength: 500,
    },
  ],
  rate: {
    type: String,
  },
});
const CinematographyInvestmentSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: [
    {
      type: String,
    },
  ],
});

const cinematographyInvestment = mongoose.model(
  "cinematographyInvestment",
  cinematographyInvestmentSchema
);
const CinematographyInvestmentSection = mongoose.model(
  "CinematographyInvestmentSection",
  CinematographyInvestmentSectionSchema
);
module.exports = { cinematographyInvestment, CinematographyInvestmentSection };
