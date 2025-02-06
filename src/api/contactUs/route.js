const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const photoController = require('./controller');
const router = express.Router();


router.post('/create',authMiddleware, photoController.createContact);
router.get('/all',  photoController.getAllContacts);
router.get('/details',  photoController.getContactById);

module.exports = router;