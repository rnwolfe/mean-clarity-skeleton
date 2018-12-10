const express = require('express');

const SettingController = require('../controllers/setting');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/example', checkAuth, SettingController.getExampleSettings);
router.put('/example', checkAuth, SettingController.updateExampleSettings);
router.delete('/example', checkAuth, SettingController.deleteExampleSettings);

module.exports = router;
