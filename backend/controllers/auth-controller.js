const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// PASTIKAN ADA KATA 'exports.'
exports.register = async (req, res) => {
    const { username, password, role } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
            [username, hashedPassword, role || 'user']
        );
        
        // Generate API Key otomatis setelah register
        const initialKey = "AK-" + crypto.randomBytes(12).toString('hex').toUpperCase();
        await db.query(
            "INSERT INTO api_keys (user_id, key_value, is_active) VALUES (?, ?, 1)", 
            [result.insertId, initialKey]
        );

        res.status(201).json({ message: "Registrasi Berhasil!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

        const validPass = await bcrypt.compare(password, users[0].password);
        if (!validPass) return res.status(401).json({ message: "Password salah" });

        const token = jwt.sign(
            { id: users[0].id, role: users[0].role }, 
            'RAHASIA_PWS_2026', 
            { expiresIn: '1d' }
        );
        res.json({ token, role: users[0].role, username: users[0].username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};