const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  srNo: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: false,
    maxlength: 500,
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
    enum: ["Classic Story Telling", "New Age Modern", "Intimates"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
const filmHeaderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 500,
  },
  media: [
    {
      type: String,
    },
  ],
});

const Films = mongoose.model("Films", filmSchema);
const FilmHeader = mongoose.model("FilmHeader", filmHeaderSchema);

module.exports = { Films, FilmHeader };
