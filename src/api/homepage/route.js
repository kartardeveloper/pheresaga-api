const express = require('express');
const router = express.Router();
const homepageController = require('./controller');


//Section 1
router.post('/create-hero-section', homepageController.createHomepageSection1);
// router.get('/hero-section', homepageController.getHomepageHeroSection);
router.put('/update-section', homepageController.updateHomepageHeroSection);
// router.delete('/delete-hero-section', homepageController.deleteHomepageHeroSection);



// //Section 2
// router.post('/create-about-section', homepageController.createHomepageAboutSection);
// router.get('/about-section', homepageController.getHomepageAboutSection);                                         
// router.put('/update-about-section', homepageController.updateHomepageAboutSection);
// router.delete('/delete-about-section', homepageController.deleteHomepageAboutSection);



//Section 3
router.delete('/delete-gallery-section', homepageController.deleteHomepageGallerySection);


// //Section 4
// router.post('/create-section4', homepageController.createHomepageSection4);
// router.get('/section4', homepageController.getHomepageSection4);
// router.put('/update-section4', homepageController.updateHomepageSection4);
// router.delete('/delete-section4', homepageController.deleteHomepageSection4);


// //Section 5
// router.post('/create-video-section', homepageController.createHomepageVideoSection);
// router.get('/video-section', homepageController.getHomepageVideoSection);
// router.put('/update-video-section', homepageController.updateHomepageVideoSection);
// router.delete('/delete-video-section', homepageController.deleteHomepageVideoSection);


// //Section 6
// router.post('/create-section6', homepageController.createHomepageSection6);
// router.get('/section6', homepageController.getHomepageSection6);
// router.put('/update-section6', homepageController.updateHomepageSection6);
// router.delete('/delete-section6', homepageController.deleteHomepageSection6);

// router.get('/home-section',homepageController.getHomepageSectionByName)

module.exports = router;
