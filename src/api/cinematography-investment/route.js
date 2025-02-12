const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware");
const cinematographyInvestmentController = require("./controller");
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  cinematographyInvestmentController.createcinematographyInvestment
);
router.get(
  "/all",
  cinematographyInvestmentController.getAllcinematographyInvestments
);
router.get(
  "/details",
  cinematographyInvestmentController.getcinematographyInvestmentById
);
router.put(
  "/update",
  authMiddleware,
  cinematographyInvestmentController.updatecinematographyInvestment
);
router.delete(
  "/delete",
  authMiddleware,
  cinematographyInvestmentController.deletecinematographyInvestment
);

router.get(
  "/section/all",
  cinematographyInvestmentController.getAllCinematographyInvestmentSections
);
router.get(
  "/section/update",
  cinematographyInvestmentController.updateCinematographyInvestmentSection
);

module.exports = router;
