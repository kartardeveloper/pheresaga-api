const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    media: {
        type: String,  
    },
    location:{
        type:String,

    },
    phoneNumber:{
        type:Number
    },
    email:{
        type: String
    },
    links: [{
        label: String,
        url: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;