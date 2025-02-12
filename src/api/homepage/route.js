const express = require("express");
const router = express.Router();
const homepageController = require("./controller");

//Section 1
// router.post("/create-hero-section", homepageController.createHomepageSection1);
router.get("/all-sections", homepageController.getHomePage);
router.put("/update-section", homepageController.updateHomepageSection);
router.delete("/delete-gallery-images", homepageController.deleteHomepageGalleryImages);
router.delete("/delete-about-images", homepageController.deleteHomepageAboutImage);
module.exports = router;
