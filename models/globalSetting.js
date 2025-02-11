const mongoose = require("mongoose");

const globalSettingSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  instagram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  contactBanner: {
    type: String,
    required: true
  },
  filmsHeading: {
    type: String,
  },
  filmsBanner: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GlobalSetting = mongoose.model("globalSetting", globalSettingSchema);

module.exports = GlobalSetting;
