
const {cinematographyInvestment,CinematographyInvestmentSection} = require('../../../models/Cinematography_Investment ');

module.exports = {
    createcinematographyInvestment :async (req, res)=> {
        try {
        const investment = await cinematographyInvestment.create(req.body);
        return res.send(investment);
        } catch (err) {
        return res.status(400).send({ error: err.message });
        }
    },
    getAllcinematographyInvestments: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.find();
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: err.message});
        }
    },
    getcinematographyInvestmentById: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.findById(req.query.id);
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({error: err.message });
        }
    },
    updatecinematographyInvestment: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },
    deletecinematographyInvestment: async (req, res) => {
        try {
            await cinematographyInvestment.findByIdAndDelete(req.query.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({error: err.message });
        }
    },
    addCinematographyInvestmentSection: async (req, res) => {
        try {
            const { title, description, media } = req.body;
            const newSection = new CinematographyInvestmentSection({
                title,
                description,
                media,
            });

            await newSection.save();
            return res.status(201).json({
                message: "Cinematography Investment Section created successfully",
                data: newSection,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getAllCinematographyInvestmentSections: async (req, res) => {
        try {
            const sections = await CinematographyInvestmentSection.find();
            return res.status(200).json({
                message: "Cinematography Investment Sections retrieved successfully",
                data: sections,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    getCinematographyInvestmentSectionById: async (req, res) => {
        try {
            const { id } = req.params;
            const section = await CinematographyInvestmentSection.findById(id);

            if (!section) {
                return res.status(404).json({ message: "Cinematography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Cinematography Investment Section retrieved successfully",
                data: section,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    updateCinematographyInvestmentSection: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, media } = req.body;

            const updatedSection = await CinematographyInvestmentSection.findByIdAndUpdate(
                id,
                { title, description, media },
                { new: true } // Return the updated document
            );

            if (!updatedSection) {
                return res.status(404).json({ message: "Cinematography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Cinematography Investment Section updated successfully",
                data: updatedSection,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    deleteCinematographyInvestmentSection: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedSection = await CinematographyInvestmentSection.findByIdAndDelete(id);

            if (!deletedSection) {
                return res.status(404).json({ message: "Cinematography Investment Section not found" });
            }

            return res.status(200).json({
                message: "Cinematography Investment Section deleted successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }


};
