const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const footerController = require('./controller');
const router = express.Router();
router.post('/add' , authMiddleware, footerController.createFooter )
router.put('/update', authMiddleware, footerController.updateFooter);
router.get('/all',  footerController.getAllFooters);
router.delete('/delete', authMiddleware, footerController.deleteFooter);


module.exports = router;