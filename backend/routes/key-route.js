const express = require('express');
const router = express.Router();
const keyController = require('../controllers/key-controller');
const authMiddleware = require('../middleware/auth-middleware');

// Endpoint ini diproteksi, hanya user yang login (punya token) bisa akses
router.post('/generate', authMiddleware, keyController.generateKey);

module.exports = router;