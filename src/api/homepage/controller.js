const homepageSections = require("../../../models/Homepage");

module.exports = {
  //Section 1
  createHomepageSection1: async (req, res) => {
    try {
      const { section } = req.query;
      const sectionData = req.body;

      // Construct the update query dynamically
      const updateQuery = { $push: { [section]: sectionData } };

      let homepage = await homepageSections.findOne();
      if (!homepage) {
        homepage = new homepageSections({ [section]: [sectionData] });
      } else {
        await homepageSections.updateOne({}, updateQuery);
      }
      const homepages = await homepageSections.findOne();

      res.status(201).json({
        message: `${section} section updated successfully`,
        data: homepages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating homepage section",
        error: error.message,
      });
    }
  },
  // getHomepageHeroSection: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({
  //             "heroSection": req.query.heroSection
  //         });
  //         if (!homepageSectionData) {
  //             return res.status(404).send({ message: 'Homepage section not found' });
  //         }
  //         res.status(200).json({ data: homepageSectionData.heroSection , message: 'Homepage section found' });
  //     } catch (err) {
  //         res.status(500).json(err.message);
  //     }
  // },
  getHomePage: async (req, res) => {
    try {
      let homepage = await homepageSections.find();

      if (!homepage) {
        return res.status(402).send({ message: "Homepage not found" });
      }

      console.log(homepage);

      res.status(200).json({
        message: "Homepage retrieved successfully",
        data: homepage,
      });
    } catch {
      res.status(500).json({
        message: "Error retrieving Homepage",
        error: error.message,
      });
    }
  },

  updateHomepageHeroSection: async (req, res) => {
    try {
      const { section } = req.query;
      const sectionData = req.body;

      const validSections = [
        "hero",
        "about",
        "gallery",
        "video_with_text",
        "videos_grid",
        "image_banner",
      ];
      if (!validSections.includes(section)) {
        return res
          .status(400)
          .send({ message: "Invalid section name provided" });
      }

      let homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).send({ message: "Homepage data not found" });
      }

      homepage[section] = sectionData;
      await homepage.save();

      res.status(200).json({
        message: `${section} section updated successfully`,
        data: homepage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating homepage section",
        error: error.message,
      });
    }
  },
  // deleteHomepageHeroSection: async (req, res) => {
  //     try {
  //         await homepageSections.findOneAndDelete( { "heroSection._id": req.query.id } );
  //         res.status(200).json({message:'Homepage Hero Section deleted'});
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },

  // //Section 2
  // createHomepageAboutSection: async (req, res) => {
  //     try {
  //         const homepageSection = new homepageSections({aboutSection : req.body});
  //         await homepageSection.save();
  //         res.status(200).json({ data: homepageSection.aboutSection });
  //     } catch (err) {
  //         res.status(400).json({error:err.message});
  //     }
  // },
  // getHomepageAboutSection: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({"aboutSection._id":req.query.id});
  //         res.status(200).json({ data: homepageSectionData.aboutSection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // updateHomepageAboutSection: async (req, res) => {
  //     try {
  //         const updatedHomepageAboutSection = await homepageSections.findOneAndUpdate(
  //             { "aboutSection._id": req.query.id },
  //             { $set: { "aboutSection": req.body } },
  //             { new: true, runValidators: true }
  //         );

  //         if (!updatedHomepageAboutSection) {
  //             return res.status(404).json({ message: 'Homepage section not found' });
  //         }

  //         res.status(200).json({ data: updatedHomepageAboutSection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // deleteHomepageAboutSection: async (req, res) => {
  //     try {
  //         await homepageSections.findOneAndDelete({ "aboutSection._id": req.query.id });
  //         res.status(200).json({message:'Homepage About Section deleted'});
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },

  // //Section 3
  // createHomepageGallerySection: async (req, res) => {
  //     try {
  //         const homepageSection = new homepageSections({gallerySection:req.body});
  //         await homepageSection.save();
  //         res.status(201).json({ data: homepageSection.gallerySection });
  //     } catch (err) {
  //         res.status(400).json({error:err.message});
  //     }
  // },
  // getHomepageGallerySection: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({"gallerySection._id":req.query.id});
  //         res.status(200).json({ data: homepageSectionData.gallerySection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // updateHomepageGallerySection: async (req, res) => {
  //     try {
  //         const updatedHomepageGallerySection = await homepageSections.findOneAndUpdate(
  //             { "gallerySection._id": req.query.id },
  //             { $set: { "gallerySection": req.body } },
  //             { new: true, runValidators: true }
  //         );

  //         if (!updatedHomepageGallerySection) {
  //             return res.status(404).json({ message: 'Homepage section not found' });
  //         }

  //         res.status(200).json({ data: updatedHomepageGallerySection.gallerySection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  deleteHomepageGallerySection: async (req, res) => {
    try {
      const homepage = await homepageSections.findOne();
      if (!homepage) {
        return res.status(404).json({ message: "Homepage data not found" });
      }

      const { id } = req.query;

      // Iterate over gallerySection and remove the specific media item
      homepage.gallery.forEach((section) => {
        if (Array.isArray(section.media)) {
          section.media = section.media.filter((mediaItem) => {
            if (mediaItem === id) {
              const filePath = path.join(__dirname, "uploads", mediaItem);
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
              return false;
            }
            return true;
          });
        }
      });

      // Save the updated document
      await homepageSections.updateOne(
        {},
        { $set: { gallery: homepage.gallery } }
      );

      res
        .status(200)
        .json({ message: "Gallery section item deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting gallery section item",
        error: error.message,
      });
    }
  },

  // //Section 4
  // createHomepageSection4: async (req, res) => {
  //     try {
  //         const homepageSection = new homepageSections({section4:req.body});
  //         await homepageSection.save();
  //         res.status(200).json({ data: homepageSection.section4 });
  //     } catch (err) {
  //         res.status(400).json({error:err.message});
  //     }
  // },
  // getHomepageSection4: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({"section4._id":req.query.id});
  //         res.status(200).json({ data: homepageSectionData.section4 });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // updateHomepageSection4 : async (req, res) => {
  //     try {
  //         const updatedHomepageSection4 = await homepageSections.findOneAndUpdate(
  //             { "section4._id": req.query.id },
  //             { $set: { "section4": req.body } },
  //             { new: true, runValidators: true }
  //         );

  //         if (!updatedHomepageSection4) {
  //             return res.status(404).json({ message: 'Homepage section not found' });
  //         }

  //         res.status(200).json({ data: updatedHomepageSection4.section4 });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // deleteHomepageSection4: async (req, res) => {
  //     try {
  //         await homepageSections.findOneAndDelete({"section4._id":req.query.id});
  //         res.status(200).json({message:'Homepage  Section 4 deleted'});
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },

  // //Section 5
  // createHomepageVideoSection: async (req, res) => {
  //     try {
  //         const homepageSection = new homepageSections({"videoSection":req.body});
  //         await homepageSection.save();
  //         res.status(200).json({ data: homepageSection.videoSection });
  //     } catch (err) {
  //         res.status(400).json({error:err.message});
  //     }
  // },
  // getHomepageVideoSection: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({"videoSection._id":req.query.id});
  //         res.status(200).json({ data: homepageSectionData.videoSection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // updateHomepageVideoSection: async (req, res) => {
  //     try {
  //         const updatedHomepageVideoSection = await homepageSections.findOneAndUpdate(
  //             { "videoSection._id": req.query.id },
  //             { $set: { "videoSection": req.body } },
  //             { new: true, runValidators: true }
  //         );

  //         if (!updatedHomepageVideoSection) {
  //             return res.status(404).json({ message: 'Homepage section not found' });
  //         }

  //         res.status(200).json({ data: updatedHomepageVideoSection.videoSection });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // deleteHomepageVideoSection: async (req, res) => {
  //     try {
  //         await homepageSections.findOneAndDelete({"videoSection._id":req.query.id});
  //         res.status(200).json({message:'Homepage Section deleted'});
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },

  // //Section 6
  // createHomepageSection6: async (req, res) => {
  //     try {
  //         const homepageSection6 = new homepageSections({"section6":req.body});
  //         await homepageSection6.save();
  //         res.status(200).json({ data: homepageSection6.section6 });
  //     } catch (err) {
  //         res.status(400).json({error:err.message});
  //     }
  // },
  // getHomepageSection6: async (req, res) => {
  //     try {
  //         const homepageSectionData = await homepageSections.findOne({"section6._id":req.query.id});
  //         res.status(200).json({ data: homepageSectionData.section6 });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // updateHomepageSection6: async (req, res) => {
  //     try {
  //         const updatedHomepageSection6 = await homepageSections.findOneAndUpdate(
  //             { "section6._id": req.query.id },
  //             { $set: { "section6": req.body } },
  //             { new: true, runValidators: true }
  //         );

  //         if (!updatedHomepageSection6) {
  //             return res.status(404).json({ message: 'Homepage section not found' });
  //         }

  //         res.status(200).json({ data: updatedHomepageSection6.section6 });
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },
  // deleteHomepageSection6: async (req, res) => {
  //     try {
  //         await homepageSections.findOneAndDelete({"section6._id":req.query.id});
  //         res.status(200).json({message:'Homepage Section6 deleted'});
  //     } catch (err) {
  //         res.status(500).json({error:err.message});
  //     }
  // },

  // getHomepageSectionByName: async (req, res) => {
  //     try {
  //         const sectionName = req.query.sectionName;
  //         if (!sectionName || typeof sectionName !== 'string' || sectionName.trim() === '') {
  //             return res.status(400).send({ message: 'Valid section name query parameter is required' });
  //         }

  //         const validSections = ['heroSection', 'aboutSection', 'gallerySection', 'section4', 'videoSection', 'section6'];
  //         if (!validSections.includes(sectionName)) {
  //             return res.status(400).send({ message: 'Invalid section name provided' });
  //         }

  //         const homepageSectionData = await homepageSections.findOne();
  //         if (!homepageSectionData) {
  //             return res.status(404).send({ message: 'Homepage data not found' });
  //         }

  //         const sectionData = homepageSectionData[sectionName];
  //         if (!sectionData) {
  //             return res.status(404).send({ message: `${sectionName} not found` });
  //         }

  //         res.status(200).json({
  //             data: sectionData,
  //             message: `${sectionName} found`
  //         });
  //     } catch (error) {
  //         console.error('Error fetching homepage section:', error);
  //         res.status(500).json({ message: 'Internal server error' });
  //     }
  // },
};

// const mongoose = require('mongoose');
// const homepageSections = mongoose.model('Homepage'); // Assuming this is your main model

// // Create models for each section collection
// const HeroSection = mongoose.model('HeroSection', new mongoose.Schema({
//     title: { type: String },
//     subtitle: { type: String },
//     image: { type: String }
// }));

// const AboutSection = mongoose.model('AboutSection', new mongoose.Schema({
//     title: { type: String },
//     description: { type: String },
//     media: [{ type: String }]
// }));

// const GallerySection = mongoose.model('GallerySection', new mongoose.Schema({
//     media: [{ type: String }]
// }));

// const Section4 = mongoose.model('Section4', new mongoose.Schema({
//     title: { type: String },
//     description: { type: String },
//     media: { type: String }
// }));

// const VideoSection = mongoose.model('VideoSection', new mongoose.Schema({
//     media: { type: String },
//     link: { type: String },
//     thumbnail: { type: String }
// }));

// const Section6 = mongoose.model('Section6', new mongoose.Schema({
//     title: { type: String },
//     description: { type: String },
//     media: { type: String }
// }));

// const sectionModels = {
//     heroSection: HeroSection,
//     aboutSection: AboutSection,
//     gallerySection: GallerySection,
//     section4: Section4,
//     videoSection: VideoSection,
//     section6: Section6
// };

// const getHomepageSectionByName = async (req, res) => {
//     try {
//         const sectionName = req.query.sectionName;

//         // Validate that sectionName exists and is valid
//         if (!sectionName || !sectionModels[sectionName]) {
//             return res.status(400).send({ message: 'Invalid section name provided' });
//         }

//         // Dynamically select the correct collection/model based on section name
//         const SectionModel = sectionModels[sectionName];

//         // Fetch the data from the appropriate collection
//         const sectionData = await SectionModel.find(); // You can modify this to find one or specific data as needed

//         if (!sectionData || sectionData.length === 0) {
//             return res.status(404).send({ message: `${sectionName} data not found` });
//         }

//         res.status(200).json({
//             data: sectionData,
//             message: `${sectionName} found`
//         });
//     } catch (err) {
//         console.error('Error fetching section:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = {
//     getHomepageSectionByName
// };
