const db = require('../config/db');

exports.getAllUsersWithKeys = async (req, res) => {
    try {
        // Query untuk mengambil data user beserta jumlah key yang mereka miliki
        const query = `
            SELECT u.id, u.username, u.role, u.created_at, 
            (SELECT COUNT(*) FROM api_keys WHERE user_id = u.id) as total_keys
            FROM users u
        `;
        const [users] = await db.query(query);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllApiKeys = async (req, res) => {
    try {
        // Query untuk melihat semua key dan siapa pemiliknya
        const query = `
            SELECT ak.id, ak.key_value, ak.is_active, u.username 
            FROM api_keys ak
            JOIN users u ON ak.user_id = u.id
        `;
        const [keys] = await db.query(query);
        res.json(keys);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};