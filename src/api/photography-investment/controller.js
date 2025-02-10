const { photographyInvestment, PhotographyInvestmentSection } = require('../../../models/Photography_Investment');

module.exports = {
    createPhotographyInvestment: async (req, res) => {
        try {
            const investment = await photographyInvestment.create(req.body);
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },
    getAllPhotographyInvestments: async (req, res) => {
        try {
            const investment = await photographyInvestment.find();
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    getPhotographyInvestmentById: async (req, res) => {
        try {
            const investment = await photographyInvestment.findById(req.params.id);
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    updatePhotographyInvestment: async (req, res) => {
        try {
            const investment = await photographyInvestment.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    deletePhotographyInvestment: async (req, res) => {
        try {
            await photographyInvestment.findByIdAndDelete(req.params.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    addPhotographyInvestmentSection: async (req, res) => {
        try {
            const { title, description, media } = req.body;
            const newSection = new PhotographyInvestmentSection({
                title,
                description,
                media,
            });

            await newSection.save();
            return res.status(201).json({
                message: "Photography Investment Section created successfully",
                data: newSection,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getAllPhotographyInvestmentSections: async (req, res) => {
        try {
            const sections = await PhotographyInvestmentSection.find();
            return res.status(200).json({
                message: "Photography Investment Sections retrieved successfully",
                data: sections,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getPhotographyInvestmentSectionById: async (req, res) => {
        try {
            const { id } = req.params;
            const section = await PhotographyInvestmentSection.findById(id);

            if (!section) {
                return res.status(404).json({ message: "Photography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Photography Investment Section retrieved successfully",
                data: section,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    updatePhotographyInvestmentSection: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, media } = req.body;

            const updatedSection = await PhotographyInvestmentSection.findByIdAndUpdate(
                id,
                { title, description, media },
                { new: true } // Return the updated document
            );

            if (!updatedSection) {
                return res.status(404).json({ message: "Photography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Photography Investment Section updated successfully",
                data: updatedSection,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    deletePhotographyInvestmentSection: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedSection = await PhotographyInvestmentSection.findByIdAndDelete(id);

            if (!deletedSection) {
                return res.status(404).json({ message: "Photography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Photography Investment Section deleted successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }


};
