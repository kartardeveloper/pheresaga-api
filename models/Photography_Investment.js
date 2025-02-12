const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographyInvestmentSchema = new Schema({
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
const PhotographyInvestmentSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: String,
  },
});

const photographyInvestment = mongoose.model(
  "photographyInvestment",
  photographyInvestmentSchema
);
const PhotographyInvestmentSection = mongoose.model(
  "PhotographyInvestmentSection",
  PhotographyInvestmentSectionSchema
);
module.exports = { photographyInvestment, PhotographyInvestmentSection };
