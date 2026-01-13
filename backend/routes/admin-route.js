const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');

// Tambahkan middleware untuk mengecek apakah role-nya benar-benar admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Akses ditolak, khusus Admin!" });
    }
    next();
};

router.get('/users', authMiddleware, isAdmin, adminController.getAllUsersWithKeys);
router.get('/all-keys', authMiddleware, isAdmin, adminController.getAllApiKeys);

module.exports = router;