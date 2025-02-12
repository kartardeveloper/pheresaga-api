const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const cinematographyController = require('./controller');
const router = express.Router();


router.post('/create', authMiddleware, cinematographyController.createphotography);
router.get('/all',cinematographyController.getAllPhotography);
router.get('/wedding-details', cinematographyController.getPhotographyById);
router.put('/update', authMiddleware, cinematographyController.updatePhotography);
router.delete('/delete', authMiddleware, cinematographyController.deletePhotography);
router.delete('/delete-images', authMiddleware , cinematographyController.deleteImages)

module.exports = router;