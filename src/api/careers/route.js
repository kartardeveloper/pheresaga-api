const express = require('express'); 
const authMiddleware = require('../../../middleware/authMiddleware');
const careerController = require('./controller');
const router = express.Router();

// router.post('/add', authMiddleware, careerController.createCareer);
// router.get('/all',  careerController.getAllCareers);
// router.get('/detail',  careerController.getCareerById);
// router.put('/:id', authMiddleware, careerController.updateCareer);
// router.delete('/:id', authMiddleware, careerController.deleteCareer);

router.post('/add-header', authMiddleware, careerController.createHeaderSection);
router.get('/all-header',  careerController.getAllHeaderSections);
router.get('/detail-header',  careerController.getHeaderSectionById);
router.put('/update-header', authMiddleware, careerController.updateHeaderSection);
router.delete('/delete-image', authMiddleware, careerController.deleteHeaderImage)

module.exports = router;