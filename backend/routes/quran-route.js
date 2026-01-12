const express = require("express");
const router = express.Router();
const quranController = require("../controllers/quran-controller");
const apiKey = require("../middleware/apiKey-middleware");

// Cek baris ini. Pastikan quranController.getAllSurahList BUKAN undefined
router.get("/surah-list", apiKey, quranController.getAllSurahList);

router.get("/surah/:number", apiKey, quranController.getSurah);
// Tambahkan di backend/routes/quran-route.js
router.get("/juz/:number", apiKey, quranController.getJuz);

module.exports = router;