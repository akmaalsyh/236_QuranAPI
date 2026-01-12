const BASE_URL = "http://localhost:3000/api";
const API_KEY = "QURAN123";

export async function getSurah(number) {
  try {
    const res = await fetch(`${BASE_URL}/surah/${number}`, {
      headers: { "x-api-key": API_KEY }
    });
    return res.json();
  } catch (err) {
    console.error("Gagal terhubung ke server:", err);
  }
}

export async function getJuz(number) {
  try {
    const res = await fetch(`${BASE_URL}/juz/${number}`, {
      headers: { "x-api-key": API_KEY }
    });
    return res.json();
  } catch (err) {
    console.error("Gagal terhubung ke server:", err);
  }
}