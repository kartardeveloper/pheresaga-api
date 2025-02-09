const homepageSections = require("../../../models/Homepage");

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
  deleteHomepageGallerySection: async (req, res) => {
    try {
      const homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).json({ message: "Homepage data not found" });
      }

      const { id } = req.query;

      // Iterate over gallerySection and remove the specific media item
      homepage.gallery.forEach((section) => {
        if (Array.isArray(section.media)) {
          section.media = section.media.filter((mediaItem) => {
            if (mediaItem === id) {
              const filePath = path.join(__dirname, "uploads", mediaItem);
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
              return false;
            }
            return true;
          });
        }
      });

      // Save the updated document
      await homepageSections.updateOne(
        {},
        { $set: { gallery: homepage.gallery } }
      );

      res
        .status(200)
        .json({ message: "Gallery section item deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting gallery section item",
        error: error.message,
      });
    }
  },
};
