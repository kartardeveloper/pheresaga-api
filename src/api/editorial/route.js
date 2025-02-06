const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const editorialController = require('./controller');
const router = express.Router();

router.put('/update', authMiddleware, editorialController.updateEditorial);
router.get('/all',  editorialController.getAllEditorials);
router.delete('/delete', authMiddleware, editorialController.deleteEditorial);


module.exports = router;