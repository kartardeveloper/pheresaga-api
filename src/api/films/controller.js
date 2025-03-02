const { Films, FilmHeader } = require("../../../models/Films");

module.exports = {
  createFilm: async (req, res) => {
    try {
      const film = await Films.create(req.body);
      return res
        .status(201)
        .json({ film, message: "Film created successfully" });
    } catch (err) {
      return res.status(400).json({ error: "Film creation failed" });
    }
  },
  getAllFilms: async (req, res) => {
    try {
      const { category } = req.query;
      let films;
      if (category === "Classic Story Telling") {
        films = await Films.find({ category: "Classic Story Telling" });
      } else if (category === "Intimates") {
        films = await Films.find({ category: "Intimates" });
      } else if (category === "New Age Modern") {
        films = await Films.find({ category: "New Age Modern" });
      } else {
        films = await Films.find();
      }
      return res.status(200).json({ films });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  getFilmById: async (req, res) => {
    try {
      const film = await Films.findById(req.query.id);
      return res.status(200).json({ film });
    } catch (err) {
      return res.status(400).json({ error: "Film listing failed" });
    }
  },
  updateFilm: async (req, res) => {
    try {
      const film = await Films.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ film, message: "Film updated successfully" });
    } catch (err) {
      return res.status(400).json({ error: "Film update failed" });
    }
  },
  updateFilmsOrder: async (req, res) => {
    try {
      const documents = req.body;

      const bulkOperations = documents.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: { srNo: doc.srNo } }, // Assign sequential numbers
        },
      }));

      if (bulkOperations.length > 0) {
        const result = await Films.bulkWrite(bulkOperations);
        res.status(200).json({
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
  deleteFilm: async (req, res) => {
    try {
      await Films.findByIdAndDelete(req.query.id);
      res.status(200).json({ message: "Film deleted successfully" });
    } catch (err) {
      return res.status(400).json({ error: "Film deletion failed" });
    }
  },

  deleteImages: async (req, res) => {
    try {
      const id = req.query;
      const wedding = await Photography.findById(id);
      if (!wedding) {
        return res.status(404).json({ message: "Wedding not found" });
      }
      // delete media by name
    } catch (error) {}
  },

  //Section header
  createFilmSectionHeader: async (req, res) => {
    try {
      const film = await FilmHeader.create(req.body);
      return res.status(201).json({ film });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  getAllFilmSectionHeaders: async (req, res) => {
    try {
      const films = await FilmHeader.find();
      return res.status(200).json({ films });
    } catch (err) {
      return res.status(400).json({ error: "Film listing failed" });
    }
  },
  getFilmSectionHeaderById: async (req, res) => {
    try {
      const film = await FilmHeader.findById(req.query.id);
      return res.status(200).json({ film });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  updateFilmSectionHeader: async (req, res) => {
    try {
      const film = await FilmHeader.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
      });
      return res.status(200).json({ film });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  deleteFilmSectionHeader: async (req, res) => {
    try {
      await FilmHeader.findByIdAndDelete(req.params.id);
      return res.status(200).json();
    } catch (err) {
      return res.status(400).json({ error: "Film deletion failed" });
    }
  },
};
