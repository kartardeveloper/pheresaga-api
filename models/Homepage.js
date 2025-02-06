const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homepageSchema = new Schema({
    // Section 1: Hero Section (Main Banner)
    heroSection: [{
        title: { type: String, required: false },
        subtitle: { type: String, required: false },
        image: { type: String, required: false },
    }],

    // Section 2: About Section
    aboutSection: [{
        title: { type: String, required: false },
        description: { type: String, required: false },
        media: [{ type: String, required: false }],
    }],

    // Section 3: Gallery Section
    gallerySection: [{
        media: [{ type: String }]
    }],

    // Section 4
    section4: [{
        title: { type: String, required: false },
        description: { type: String, required: false },
        media: { type: String, required: false }

    }],

    // Section 5: Blog Section
    videoSection: [{
        media: { type: String, required: false },
        link: { type: String, required: false }
    }],

    // Section 6: 
    section6: [{
        title: { type: String, required: false },
        description: { type: String, required: false },
        media: { type: String, required: false }
    }]
});

// Creating a model based on the schema
const homepageSections = mongoose.model('Homepage', homepageSchema);

module.exports = homepageSections;

