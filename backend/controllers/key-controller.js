const crypto = require('crypto');
const db = require('../config/db');

exports.generateKey = async (req, res) => {
    try {
        // 1. Validasi keberadaan user ID dari token
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User tidak terautentikasi" });
        }

        // 2. Membuat string acak 32 karakter (16 bytes hex = 32 chars)
        const newKey = "AK-" + crypto.randomBytes(16).toString('hex').toUpperCase();
        
        // 3. Simpan ke database
        // Menggunakan await untuk memastikan query selesai sebelum mengirim response
        await db.query(
            "INSERT INTO api_keys (user_id, key_value, is_active) VALUES (?, ?, 1)", 
            [req.user.id, newKey]
        );
        
        // 4. Kirim response sukses
        res.status(201).json({ 
            message: "API Key berhasil dibuat", 
            api_key: newKey 
        });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: "Gagal menyimpan API Key ke database" });
    }
};

exports.getMyKeys = async (req, res) => {
    try {
        // 1. Validasi user ID
        const userId = req.user.id;

        // 2. Ambil semua key milik user tersebut, urutkan dari yang terbaru (descending)
        // Penambahan ORDER BY id DESC sangat penting agar key terbaru muncul paling atas di tabel frontend
        const [keys] = await db.query(
            "SELECT key_value, is_active, created_at FROM api_keys WHERE user_id = ? ORDER BY id DESC", 
            [userId]
        );
        
        res.json(keys);
    } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ error: "Gagal mengambil daftar API Key" });
    }
};