const express = require("express");
const cors = require("cors");
const quranRoutes = require("./routes/quran-route");

const app = express();

// Middleware Global
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", quranRoutes);

// Penanganan Route Tidak Ditemukan
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});