const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sql123',
  database: 'quran_api',
  port: 3308,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Menggunakan promise agar bisa memakai async/await
const db = pool.promise();

db.getConnection()
  .then(() => console.log('MySQL Connected via Pool (Port 3308)'))
  .catch(err => console.error('Database Connection Error:', err));

module.exports = db;