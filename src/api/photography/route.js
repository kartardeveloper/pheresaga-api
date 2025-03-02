const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const photographyController = require('./controller');
const router = express.Router();


router.post('/create', authMiddleware, photographyController.createphotography);
router.get('/all',photographyController.getAllPhotography);
router.get('/wedding-details', photographyController.getPhotographyById);
router.put('/update', authMiddleware, photographyController.updatePhotography);
router.delete('/delete', authMiddleware, photographyController.deletePhotography);
router.delete('/delete-images', authMiddleware , photographyController.deleteImages)
router.put('/update-order', authMiddleware, photographyController.updatePhotographyOrder);

module.exports = router;