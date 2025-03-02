const express = require("express");
const authMiddleware = require("../../../middleware/authMiddleware");
const filmController = require("./controller");
const router = express.Router();

router.post("/create", authMiddleware, filmController.createFilm);
router.get("/all", filmController.getAllFilms);
router.get("/film-details", filmController.getFilmById);
router.put("/update", authMiddleware, filmController.updateFilm);
router.delete("/delete", authMiddleware, filmController.deleteFilm);
router.put("/update-order", authMiddleware, filmController.updateFilmsOrder);

//Section header
router.post(
  "/create-section-header",
  authMiddleware,
  filmController.createFilmSectionHeader
);
router.get("/all-headers", filmController.getAllFilmSectionHeaders);
router.get("/header-details", filmController.getFilmSectionHeaderById);
router.put(
  "/update-header",
  authMiddleware,
  filmController.updateFilmSectionHeader
);
// router.delete('/:id', authMiddleware, filmController.deleteFilmSectionHeader);

module.exports = router;
