const Photography = require("../../../models/Photography");
const fs = require("fs");
const path = require("path");

module.exports = {
  createphotography: async (req, res) => {
    try {
      const { title, description, credits, media, thumbnail, category } =
        req.body;

      if (!title || !description || !category) {
        return res.status(400).json({
          error: "Title, description, and category are required fields",
        });
      }

      const newPhotography = new Photography({
        srNo,
        title,
        description,
        credits: credits || "",
        media: media || "",
        thumbnail: thumbnail || "",
        category,
      });

      await newPhotography.save();

      res.status(201).json({
        message: "Wedding created successfully",
        data: newPhotography,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the wedding" });
    }
  },

  getAllPhotography: async (req, res) => {
    try {
      const { category } = req.query;
      let photography;
      if (category === "indian") {
        photography = await Photography.find({ category: "indian" });
      } else if (category === "international") {
        photography = await Photography.find({ category: "international" });
      } else {
        photography = await Photography.find();
      }
      res.status(200).json({
        message: "Weddings retrieved successfully",
        data: photography,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving weddings", error: error.message });
    }
  },
  getPhotographyById: async (req, res) => {
    try {
      const { id } = req.query;
      const photography = await Photography.findById(id);
      if (!photography) {
        return res.status(404).json({ message: "Wedding not found" });
      }
      res
        .status(200)
        .json({ message: "Wedding retrieved successfully", data: photography });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving wedding", error: error.message });
    }
  },
  updatePhotography: async (req, res) => {
    try {
      const { id } = req.query;
      const { title, description, media } = req.body;
      const photography = await Photography.findByIdAndUpdate(
        id,
        { ...req.body, title, description, media },
        { new: true }
      );
      if (!photography) {
        return res.status(404).json({ message: "Wedding not found" });
      }
      res
        .status(200)
        .json({ message: "Wedding updated successfully", data: photography });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating wedding", error: error.message });
    }
  },
  updatePhotographyOrder: async (req, res) => {
    try {
      const documents = req.body;
      
      const bulkOperations = documents.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: { srNo: doc.srNo } }, // Assign sequential numbers
        },
      }));
      
      if (bulkOperations.length > 0) {
        const result = await Photography.bulkWrite(bulkOperations);
        res
          .status(200)
          .json({
            message: `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents`,
          });
      } else {
        console.log("No documents found to update.");
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating wedding", error: error.message });
    }
  },
  deletePhotography: async (req, res) => {
    try {
      const { id } = req.query;
      const photography = await Photography.findByIdAndDelete(id);
      if (!photography) {
        return res.status(404).json({ message: "Wedding not found" });
      }

      // if (photography.media) {
      //     const mediaPath = path.join(__dirname, '../../../uploads', photography.media);
      //     fs.unlink(mediaPath, (err) => {
      //         if (err) console.error(`Failed to delete media file: ${err.message}`);
      //     });
      // }

      // if (photography.thumbnail) {
      //     const thumbnailPath = path.join(__dirname, '../../../uploads', photography.thumbnail);
      //     fs.unlink(thumbnailPath, (err) => {
      //         if (err) console.error(`Failed to delete thumbnail file: ${err.message}`);
      //     });
      // }

      res.status(200).json({ message: "Wedding deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting wedding", error: error.message });
    }
  },

  deleteImages: async (req, res) => {
    try {
      const { id, mediaName } = req.query;
      if (!id || !mediaName) {
        return res
          .status(400)
          .json({ message: "Missing wedding ID or media name" });
      }

      const wedding = await Photography.findById(id);
      if (!wedding) {
        return res.status(404).json({ message: "Wedding not found" });
      }

      const mediaIndex = wedding.media.indexOf(mediaName);
      if (mediaIndex === -1) {
        return res.status(404).json({ message: "Media not found" });
      }

      wedding.media.splice(mediaIndex, 1);
      const mediaNameWithoutPrefix = mediaName.replace(/^uploads\//, "");
      const mediaFilePath = path.join(
        __dirname,
        "../../../uploads",
        mediaNameWithoutPrefix
      );

      if (fs.existsSync(mediaFilePath)) {
        await fs.promises.unlink(mediaFilePath);
        console.log(`File ${mediaName} deleted successfully.`);
      } else {
        console.log(`File ${mediaName} not found in upload folder.`);
      }

      await wedding.save();

      return res.status(200).json({ message: "Media deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again." });
    }
  },
};
