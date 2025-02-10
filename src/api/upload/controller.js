const upload = require("../../../utils/multer");
module.exports = {
  uploadSingle: async (req, res) => {
    try {
      upload.single("file")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded." });
        }

        res.status(200).json({
          message: "File uploaded successfully.",
          filePath: req.file.path,
        });
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred during the upload." });
    }
  },
  uploadMultiple: async (req, res) => {
    try {
      upload.array("files", 30)(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No files uploaded." });
        }

        const filePaths = req.files.map((file) => file.path);

        res.status(200).json({
          message: "Files uploaded successfully.",
          filePaths: filePaths,
        });
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred during the upload." });
    }
  },
};
