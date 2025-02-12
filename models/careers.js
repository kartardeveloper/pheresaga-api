const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const careerSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     residence: {
//         type: String,
//         required: true
//     },
//     position:
//     {
//         type: String,
//         required: true,
//         enum: ["Studio Manager(Banglore)", "Director", "Lead Cinematographer", "Lead Photographer", "Photographer", "Cinematographer", "Photo Editor", "Film Editor", "Intern"]

//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     professionalPortfolioLink: {
//         type: String,
//         required: true
//     },
//     personalPortfolioLink: {
//         type: String,
//         required: true
//     },
//     workLocation: {
//         type: String,
//         required: true
//     },
//     instagramLink: {
//         type: String,
//         required: true
//     },
//     professionalExperience: {
//         type: String,
//         required: true
//     },
//     datePosted: {
//         type: Date,
//         default: Date.now
//     }
// })
const headerSectionSchema = new Schema({
  firstLine: { type: String },
  secondLine: { type: String },
  thirdLine: { type: String },
  media: [{
      type: String
    }],
});
const HeaderSection = mongoose.model(
  "HeaderSectionCareer",
  headerSectionSchema
);

// const Career = mongoose.model('Career', careerSchema);

module.exports = HeaderSection;
