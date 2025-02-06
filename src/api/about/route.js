const express = require('express');
const router = express.Router();
const aboutController = require('./controller');
const authMiddleware = require('../../../middleware/authMiddleware');

router.post('/create', authMiddleware, aboutController.createAbout);
router.get('/all', aboutController.getAllAbouts);
// router.get('/:id',authMiddleware,  aboutController.getAboutById);
router.put('/update', authMiddleware, aboutController.updateAbout);
router.delete('/delete', authMiddleware, aboutController.deleteAbout);

module.exports = router;