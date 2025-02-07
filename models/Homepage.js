const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homepageSchema = new Schema({
  // Section 1: Hero Section (Main Banner)
  hero: [
    {
      title: { type: String, required: false },
      subtitle: { type: String, required: false },
      image: { type: String, required: false },
    },
  ],

  // Section 2: About Section
  about: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      media: [{ type: String, required: false }],
    },
  ],

  // Section 3: Gallery Section
  gallery: [
    {
      media: [{ type: String }],
    },
  ],

  // Section 4
  video_with_text: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      media: { type: String, required: false },
    },
  ],

  // Section 5: Blog Section
  videos_grid: [
    {
      media: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],

  // Section 6:
  image_banner: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      media: { type: String, required: false },
    },
  ],
});

// Creating a model based on the schema
const homepageSections = mongoose.model("Homepage", homepageSchema);

module.exports = homepageSections;
