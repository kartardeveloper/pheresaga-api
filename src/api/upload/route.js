const express  = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const uploadController = require('./controller');
const router = express.Router();

router.post('/upload', uploadController.uploadSingle);

router.post('/upload-multiple', uploadController.uploadMultiple);


module.exports = router;