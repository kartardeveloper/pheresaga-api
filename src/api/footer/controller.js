const Footer = require("../../../models/Footer");
module.exports = {
getAllFooters : async (req, res) => {
    try {
        const footers = await Footer.find();
        res.status(200).json(footers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

getFooterById : async (req, res) => {
    try {
        const footer = await Footer.findById(req.query.id);
        if (!footer) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        res.status(200).json(footer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
createFooter : async (req, res) => {
    try {
        const { media, location, phoneNumber, email, links } = req.body;
        const newFooter = new Footer({ media, location, phoneNumber, email, links });
        await newFooter.save();
        res.status(201).json(newFooter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

updateFooter : async (req, res) => {
    try {
        const { media, location, phoneNumber, email, links } = req.body;
        const updatedFooter = await Footer.findByIdAndUpdate(
            req.query.id,
            { media, location, phoneNumber, email, links },
            { new: true, runValidators: true }
        );
        if (!updatedFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        res.status(200).json(updatedFooter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
deleteFooter : async (req, res) => {
    try {
        const deletedFooter = await Footer.findByIdAndDelete(req.query.id);
        if (!deletedFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        res.status(200).json({ message: 'Footer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}