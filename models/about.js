const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    media: [{
        type: String
    }],
    date:{
        type: Date,
        default: Date.now
    }
});
const aboutSections = mongoose.model('About', aboutSchema);
module.exports = aboutSections;