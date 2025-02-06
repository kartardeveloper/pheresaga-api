const editorial = require("../../../models/Editorial");
const fs = require('fs');
const path = require('path');
module.exports = {
    getAllEditorials: async (req, res) => {
        try {
            const editorials = await editorial.find(req.query);
            res.json(editorials);
        } catch (err) {
            res.status(422).json(err);
        }
    },
    updateEditorial: async (req, res) => {
        try {
          const { id } = req.query; // Ensure the ID is being correctly accessed from the query parameters
          const { gallery } = req.body;
      
          // Check if the gallery is valid
          if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
            return res.status(400).json({ message: 'Gallery must be an array with at least one image.' });
          }
      
          // Find the editorial by ID and update its gallery
          const updatedEditorial = await editorial.findByIdAndUpdate(
            id,
            {
                $push: {
                  gallery: {
                    $each: gallery.map(img => ({
                      path: img.path,
                      uploadedAt: img.uploadedAt || new Date()
                    }))
                  }
                }
              },
              { new: true } // Return the updated document
            );
      
          if (!updatedEditorial) {
            return res.status(404).json({ message: 'Editorial not found.' });
          }
      
          res.status(200).json({ message: 'Editorial updated successfully', data: updatedEditorial });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      },


    
    deleteEditorial: async (req, res) => {
        try {
            const { filename } = req.query; 
            if (!filename) {
                return res.status(400).json({ message: "Filename is required" });
            }
    
            const editorialItem = await editorial.findById(req.query.id);
            if (!editorialItem) {
                return res.status(404).json({ message: "Editorial not found" });
            }
    
            const fileIndex = editorialItem.gallery.findIndex(file => path.basename(file.path) === filename);
            if (fileIndex === -1) {
                return res.status(404).json({ message: "File not found in the gallery" });
            }
    
            const removedFile = editorialItem.gallery.splice(fileIndex, 1)[0];
            if (!removedFile.path || typeof removedFile.path !== 'string') {
                return res.status(500).json({ message: "Invalid file path" });
            }
    
            // Convert relative path to absolute path
            const filePath = path.resolve(removedFile.path);
    
            // Delete the file from the file system
            await new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting the file from the system:", err);
                        return reject(new Error("Error deleting the file from the system"));
                    }
                    resolve();
                });
            });
    
            await editorialItem.save();
    
            res.json({ message: "File deleted successfully", editorial: editorialItem });
        } catch (err) {
            console.error(err);
            res.status(422).json(err);
        }
    }
    
    
};