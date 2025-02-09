const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const faqController = require('./controller');
const router = express.Router();
router.post('/add' , authMiddleware, faqController.createFAQ)
router.put('/update', authMiddleware, faqController.updateFAQ);
router.get('/all',  faqController.getAllFAQs);
router.delete('/delete', authMiddleware, faqController.deleteFAQ);


module.exports = router;