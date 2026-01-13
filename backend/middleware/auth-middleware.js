const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Mengambil token dari header 'Authorization: Bearer <token>'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Akses ditolak, silakan login" });

    try {
        const verified = jwt.verify(token, 'RAHASIA_PWS_2026');
        req.user = verified; // Menyimpan id dan role user ke object request
        next();
    } catch (err) {
        res.status(403).json({ message: "Token kadaluwarsa atau tidak valid" });
    }
};