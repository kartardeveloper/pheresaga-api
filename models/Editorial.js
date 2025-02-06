const mongoose = require("mongoose");
const Schema = mongoose.Schema

const editorialSchema = new Schema({

  gallery: [{
    path: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]

})
const editorial = mongoose.model('editorial', editorialSchema);
module.exports = editorial;