const express = require('express'); 
const authMiddleware = require('../../../middleware/authMiddleware');
const careerController = require('./controller');
const router = express.Router();

router.post('/add', authMiddleware, careerController.createCareer);
router.get('/all',  careerController.getAllCareers);
router.get('/detail',  careerController.getCareerById);
// router.put('/:id', authMiddleware, careerController.updateCareer);
// router.delete('/:id', authMiddleware, careerController.deleteCareer);

module.exports = router;