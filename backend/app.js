const express = require("express");
const cors = require("cors");
const quranRoutes = require("./routes/quran-route");
const authRoute = require('./routes/auth-route');
const keyRoute = require('./routes/key-route');
const adminRoute = require('./routes/admin-route'); // Pastikan ini juga diimport

const app = express();

// 1. Middleware Global (WAJIB DI ATAS ROUTE)
app.use(cors()); 
app.use(express.json()); 

// 2. Routes
app.use('/api/auth', authRoute);
app.use('/api/keys', keyRoute);
app.use('/api/admin', adminRoute); // Tambahkan rute admin jika sudah ada
app.use("/api", quranRoutes);

// 3. Penanganan Route Tidak Ditemukan
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});