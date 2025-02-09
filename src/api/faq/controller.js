const FAQ = require("../../../models/FAQ");
module.exports = {
  getAllFAQs: async (req, res) => {
    try {
      const faqs = await FAQ.find();
      res.status(200).json({ faqs, message: "Faqs retrieved successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getFAQById: async (req, res) => {
    try {
      const faq = await FAQ.findById(req.query.id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.status(200).json(faq);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createFAQ: async (req, res) => {
    try {
      const { question, answer } = req.body;
      const newFAQ = new FAQ({ question, answer });
      await newFAQ.save();
      res.status(201).json({ message: "Faq created successfully", newFAQ });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateFAQ: async (req, res) => {
    try {
      const { question, answer } = req.body;
      const updatedFAQ = await FAQ.findByIdAndUpdate(
        req.query.id,
        { question, answer },
        { new: true, runValidators: true }
      );
      if (!updatedFAQ) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res
        .status(200)
        .json({ message: "Faq updated successfully", faq: updatedFAQ });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteFAQ: async (req, res) => {
    try {
      const deletedFAQ = await FAQ.findByIdAndDelete(req.query.id);
      if (!deletedFAQ) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
