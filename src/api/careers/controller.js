const HeaderSectionCareer = require("../../../models/careers");
const fs = require('fs');
const path = require('path');
module.exports = {
  // createCareer: async (req, res) => {
  //   try {
  //     const careers = await career.create(req.body);
  //     return res.status(201).json(careers);
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // },
  // getAllCareers: async (req, res) => {
  //   try {
  //     const careers = await career.find();
  //     return res.status(200).json(careers);
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // },
  // getCareerById: async (req, res) => {
  //   try {
  //     const careers = await career.findById(req.query.id);
  //     return res.status(200).json(careers);
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // },
  // updateCareer :  async (req, res) =>{
  //     try {
  //         const careers = await career.findByIdAndUpdate(req.query.id, req.body, { new: true });
  //         return res.status(200).json(careers);
  //     } catch (err) {
  //         return res.status(400).json(err);
  //     }
  // },
  // deleteCareer: async (req, res)=> {
  //     try {
  //         await career.findByIdAndDelete(req.query.id);
  //         return res.status(204).json();
  //     } catch (err) {
  //         return res.status(400).json(err);
  //     }
  // }
  getAllHeaderSections: async (req, res) => {
    try {
      const headers = await HeaderSectionCareer.find();
      res.status(200).json(headers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getHeaderSectionById: async (req, res) => {
    try {
      const header = await HeaderSectionCareer.findById(req.query.id);
      if (!header) {
        return res.status(404).json({ message: "Header Section not found" });
      }
      res.status(200).json(header);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createHeaderSection: async (req, res) => {
    try {
      const { firstLine, secondLine, thirdLine, media } = req.body;
      const newHeader = new HeaderSectionCareer({
        firstLine,
        secondLine,
        thirdLine,
        media,
      });
      await newHeader.save();
      res.status(201).json(newHeader);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateHeaderSection: async (req, res) => {
    try {
      const { firstLine, secondLine, thirdLine, media } = req.body;
      const updatedHeader = await HeaderSectionCareer.findByIdAndUpdate(
        req.query.id,
        { firstLine, secondLine, thirdLine, media },
        { new: true, runValidators: true }
      );
      if (!updatedHeader) {
        return res.status(404).json({ message: "Header Section not found" });
      }
      res.status(200).json(updatedHeader);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteHeaderImage: async (req, res) => {
    try {
      // Find the header section document
      const headerSection = await HeaderSectionCareer.findOne();
  
      if (!headerSection) {
        return res.status(404).json({ message: "Header Section not found" });
      }
  
      const { id } = req.query;
  
      // Check if media exists and is an array
      if (headerSection.media && Array.isArray(headerSection.media)) {
        let mediaFound = false;
  
        console.log("Media List: ", headerSection.media);
  
        // Loop through each media item to find the matching one
        for (let i = 0; i < headerSection.media.length; i++) {
          const mediaFile = headerSection.media[i];
          
          if (mediaFile === id) {
            mediaFound = true;
  
            const mediaNameWithoutPrefix = mediaFile.replace(/^uploads\//, '');
            console.log("Media Name Without Prefix:", mediaNameWithoutPrefix);
  
            // Construct the file path
            const filePath = path.join(__dirname, '../../../uploads', mediaNameWithoutPrefix);
            console.log("Full file path to delete:", filePath);
  
            // Check if the file exists and delete it
            if (fs.existsSync(filePath)) {
              await fs.promises.unlink(filePath);
              console.log(`File ${mediaFile} deleted successfully.`);
            } else {
              console.warn(`File ${mediaFile} not found in the upload folder: ${filePath}`);
            }
  
            // Remove the media item from the array
            headerSection.media.splice(i, 1);
            break;  // Exit loop after deleting the matching media file
          }
        }
  
        // If the media item was not found, send error
        if (!mediaFound) {
          return res.status(404).json({ message: "Media item not found" });
        }
  
        // Save the updated header section (with the media item removed)
        await headerSection.save();
  
        res.status(200).json({ message: "Header Section image deleted successfully" });
      } else {
        return res.status(400).json({ message: "No media found in the header section" });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting header section", error: error.message });
    }
  }
  
};
