const express = require('express');
const router = express.Router();
const adminController = require('./controller');
const authMiddleware = require('../../../middleware/authMiddleware');

router.post('/sign-in', adminController.signIn);
router.post('/sign-up',  adminController.signUp);
router.get('/details', authMiddleware, adminController.userDetails);
router.put('/update', authMiddleware, adminController.updateUser);


module.exports = router;