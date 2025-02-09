const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const globalSettingController = require('./controller');
const router = express.Router();
router.post('/add' , authMiddleware, globalSettingController.createGlobalSetting )
router.put('/update', authMiddleware, globalSettingController.updateGlobalSetting);
router.get('/all',  globalSettingController.getAllGlobalSettings);
router.delete('/delete', authMiddleware, globalSettingController.deleteGlobalSetting);


module.exports = router;