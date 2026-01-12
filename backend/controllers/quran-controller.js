const quranService = require("../services/quran-service");


// Pastikan namanya "getAllSurahList"
exports.getAllSurahList = async (req, res) => {
  try {
    const data = await quranService.fetchAllSurah();
    res.json({ status: "Success", data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};

exports.getSurah = async (req, res) => {
  try {
    const data = await quranService.fetchSurah(req.params.number);
    res.json({ status: "Success", data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};


exports.getJuz = async (req, res) => {
  try {
    const data = await quranService.fetchJuz(req.params.number);
    res.json({ status: "Success", data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err.message });
  }
};