const mongoose = require("mongoose");

const globalSettingSchema = new mongoose.Schema({
  logo: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GlobalSetting = mongoose.model("globalSetting", globalSettingSchema);

module.exports = GlobalSetting;
