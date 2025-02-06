const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Contact Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    estimatedGuestCount: {
        type: Number,
        required: true
    },
    eventFlow: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventDates: {
        type: String,
        required: true
    },
    services: {
        type: String,
        required: true,
        enum: ["photography", "films", "Both Photography and Films"]
    }
});

// Define Section Schema
const sectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    media:{
        type:String
    }

});

// Create Mongoose models
const Contact = mongoose.model('Contact', contactSchema);
const Section = mongoose.model('Section', sectionSchema);

module.exports = { Contact, Section };
