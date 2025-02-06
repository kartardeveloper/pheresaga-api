const mongoose = require("mongoose")
const Schema = mongoose.Schema
const globalSettingSchema = new mongoose.Schema({
    logo: {
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
    social: [{
        label: String,
        url: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GlobalSetting = mongoose.model('globalSetting', globalSettingSchema);

module.exports = GlobalSetting;
