const axios = require("axios");
const BASE_URL = "https://api.alquran.cloud/v1";

exports.fetchSurah = async (number) => {
  try {
    const res = await axios.get(`${BASE_URL}/surah/${number}`);
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal mengambil data Surah");
  }
};

exports.fetchJuz = async (number) => {
  try {
    const res = await axios.get(`${BASE_URL}/juz/${number}/quran-uthmani`);
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal mengambil data Juz");
  }
};

exports.fetchAllSurah = async () => {
  // Mengambil daftar semua surah dari API eksternal
  const res = await axios.get("https://api.alquran.cloud/v1/surah");
  return res.data.data;
};