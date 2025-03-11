const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographySchema = new Schema({
  srNo: {
    type: Number,
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  detailedTitle: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  description: {
    type: String,
    required: false,
    maxlength: 500,
  },
  credits: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  media: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: ["international", "indian"],
    required: true,
  },
  dateTaken: {
    type: Date,
    required: true,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: false,
  },
});

const Photography = mongoose.model("photography", photographySchema);

module.exports = Photography;
