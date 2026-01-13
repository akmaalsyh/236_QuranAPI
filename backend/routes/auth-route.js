const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

// Pastikan endpoint ini sesuai dengan kebutuhan login/register Anda
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;