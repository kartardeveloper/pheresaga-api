const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homepageSchema = new Schema({
  hero: {
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
    media: { type: String, required: false },
  },
  about: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    media: [{ type: String, required: false }],
  },
  gallery: {
    media: [{ type: String }],
  },
  video_with_text: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    media: { type: String, required: false },
  },
  videos_grid: {
    media1: { type: String, required: false },
    media2: { type: String, required: false },
    media3: { type: String, required: false },
    media4: { type: String, required: false },
    media5: { type: String, required: false },
    media6: { type: String, required: false },
  },
  image_banner: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    media: { type: String, required: false },
  },
});

const homepageSections = mongoose.model("Homepage", homepageSchema);

module.exports = homepageSections;
