const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const photographyInvestmentController = require('./controller');
const router = express.Router();

router.post('/create', authMiddleware, photographyInvestmentController.createPhotographyInvestment);
router.get('/all',  photographyInvestmentController.getAllPhotographyInvestments);
router.get('/detail', photographyInvestmentController.getPhotographyInvestmentById);
router.put('/update', authMiddleware, photographyInvestmentController.updatePhotographyInvestment);
router.delete('/delete', authMiddleware, photographyInvestmentController.deletePhotographyInvestment);


module.exports = router;