const HeaderSectionCareer = require("../../../models/careers");

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
  deleteHeaderSection: async (req, res) => {
    try {
      const deletedHeader = await HeaderSectionCareer.findByIdAndDelete(
        req.query.id
      );
      if (!deletedHeader) {
        return res.status(404).json({ message: "Header Section not found" });
      }
      res.status(200).json({ message: "Header Section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
