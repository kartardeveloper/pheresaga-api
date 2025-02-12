const homepageSections = require("../../../models/Homepage");
const fs = require('fs');
const path = require('path');
module.exports = {
  getHomePage: async (req, res) => {
    try {
      let homepage = await homepageSections.find();

      if (!homepage) {
        return res.status(402).send({ message: "Homepage not found" });
      }

      res.status(200).json({
        message: "Homepage retrieved successfully",
        data: homepage,
      });
    } catch {
      res.status(500).json({
        message: "Error retrieving Homepage",
        error: error.message,
      });
    }
  },

  updateHomepageSection: async (req, res) => {
    try {
      const { section } = req.query;
      const sectionData = req.body;

      const validSections = [
        "hero",
        "about",
        "gallery",
        "video_with_text",
        "videos_grid",
        "image_banner",
      ];
      if (!validSections.includes(section)) {
        return res
          .status(400)
          .send({ message: "Invalid section name provided" });
      }

      let homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).send({ message: "Homepage data not found" });
      }

      homepage[section] = sectionData;

      await homepage.save();

      res.status(200).json({
        message: `${section.split("_").join(" ")} section updated successfully`,
        data: homepage,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error updating section`,
        error: error.message,
      });
    }
  },
  deleteHomepageGalleryImages: async (req, res) => {
    try {

      const homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).json({ message: "Homepage data not found" });
      }

      const { id } = req.query;
      if (!Array.isArray(homepage.gallery.media)) {
        return res.status(400).json({ message: "Gallery is not an array" });
      }
      let mediaFound = false;
      for (let i = 0; i < homepage.gallery.media.length; i++) {
        const mediaItem = homepage.gallery.media[i];

        if (mediaItem === id) {
          mediaFound = true;

          const mediaNameWithoutPrefix = mediaItem.replace(/^uploads\//, '');
          const mediaFilePath = path.join(__dirname, '../../../uploads', mediaNameWithoutPrefix);

          if (fs.existsSync(mediaFilePath)) {
            await fs.promises.unlink(mediaFilePath);
            console.log(`File ${mediaItem} deleted successfully.`);
          } else {
            console.log(`File ${mediaItem} not found in the upload folder.`);
          }

          homepage.gallery.media.splice(i, 1);
          break;
        }
      }

      if (!mediaFound) {
        return res.status(404).json({ message: "Media item not found" });
      }

      await homepageSections.updateOne(
        {},
        { $set: { gallery: homepage.gallery } }
      );

      res.status(200).json({ message: "Gallery section item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error deleting gallery section item",
        error: error.message,
      });
    }
  },
  deleteHomepageAboutImage: async (req, res) => {
    try {

      const homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).json({ message: "Homepage data not found" });
      }

      const { id } = req.query;

      if (!Array.isArray(homepage.about.media)) {
        return res.status(400).json({ message: "About section media is not an array" });
      }

      let mediaFound = false;
      for (let i = 0; i < homepage.about.media.length; i++) {
        const mediaItem = homepage.about.media[i];

        if (mediaItem === id) {
          mediaFound = true;
          const mediaNameWithoutPrefix = mediaItem.replace(/^uploads\//, '');
          const mediaFilePath = path.join(__dirname, '../../../uploads', mediaNameWithoutPrefix);

          if (fs.existsSync(mediaFilePath)) {
            await fs.promises.unlink(mediaFilePath);
            console.log(`File ${mediaItem} deleted successfully.`);
          } else {
            console.log(`File ${mediaItem} not found in the upload folder.`);
          }

          homepage.about.media.splice(i, 1);
          break;
        }
      }

      if (!mediaFound) {
        return res.status(404).json({ message: "Media item not found" });
      }

      await homepageSections.updateOne(
        {},
        { $set: { about: homepage.about } }
      );

      res.status(200).json({ message: "About section image deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error deleting About section image",
        error: error.message,
      });
    }
  }

};
