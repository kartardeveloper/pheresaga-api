const Photography = require('../../../models/Photography');
const fs = require('fs');
const path = require('path');

module.exports = {              
    createphotography: async (req, res) => {
        try {
            const { title, description, credits, media, thumbnail, category } = req.body;

            if (!title || !description || !category) {
                return res.status(400).json({ error: 'Title, description, and category are required fields' });
            }

            const newPhotography = new Photography({
                title,
                description,
                credits: credits || '',  
                media: media || '',     
                thumbnail: thumbnail || '', 
                category
            });
    
            await newPhotography.save();

            res.status(201).json({
                message: 'Photography created successfully',
                data: newPhotography
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the photography entry' });
        }
    },
    
    getAllPhotography: async (req, res) => {
        try {
            const { category } = req.query;
            let photography;
            if (category === 'indian') {
                photography = await Photography.find({ category: 'indian' });
            } else if (category === 'international') {
                photography = await Photography.find({ category: 'international' });
            } else {
                photography = await Photography.find();
            }
            res.status(200).json({ message: 'Photography retrieved successfully', data: photography });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving photography', error: error.message });
        }
    },
    getPhotographyById: async (req, res) => {
        try {
            const { id } = req.query;
            const photography = await Photography.findById(id);
            if (!photography) {
                return res.status(404).json({ message: 'Photography not found' });
            }
            res.status(200).json({ message: 'Photography retrieved successfully', data: photography });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving photography', error: error.message });
        }
    },
    updatePhotography: async (req, res) => {
        try {
            const { id } = req.query;
            const { title, description, media } = req.body;
            console.log(req.body)
            const photography = await Photography.findByIdAndUpdate(id, { ...req.body, title, description, media }, { new: true });
            if (!photography) {
                return res.status(404).json({ message: 'Photography not found' });
            }
            res.status(200).json({ message: 'Photography updated successfully', data: photography });
        } catch (error) {
            res.status(500).json({ message: 'Error updating photography', error: error.message });
        }
    },
    deletePhotography: async (req, res) => {
        try {
            const { id } = req.query;
            const photography = await Photography.findByIdAndDelete(id);
            if (!photography) {
                return res.status(404).json({ message: 'Photography not found' });
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

            res.status(200).json({ message: 'Photography deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting photography', error: error.message });
        }
    }
}