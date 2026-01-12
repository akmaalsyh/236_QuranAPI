import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function JuzDetail() {
  const { number } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJuzData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Mengambil data Arab dan Indonesia secara terpisah untuk menghindari error 500
        const [resArab, resIndo] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/juz/${number}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/juz/${number}/id.indonesian`)
        ]);

        const dataArab = await resArab.json();
        const dataIndo = await resIndo.json();

        if (dataArab.code === 200 && dataIndo.code === 200) {
          const combined = dataArab.data.ayahs.map((ayah, i) => ({
            ...ayah,
            translation: dataIndo.data.ayahs[i].text
          }));
          setData(combined);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchJuzData();
  }, [number]);

  if (loading) return <div className="container" style={{textAlign: 'center'}}><h2>Memuat Juz {number}...</h2></div>;
  if (error) return <div className="container" style={{textAlign: 'center'}}><h2>Gagal memuat data Juz {number}. Coba lagi nanti.</h2><Link to="/">Kembali</Link></div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">← Kembali ke Beranda</Link>
      <h1 style={{ textAlign: "center", color: "#16a34a", marginBottom: "40px" }}>Juz {number}</h1>

      <div className="ayah-list">
        {data.map((ayah) => (
          <div key={ayah.number} className="ayah-item-wrapper" style={{ borderBottom: "1px solid #eee", padding: "30px 0" }}>
             {/* Header Ayat: Nomor dan Nama Surah */}
             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <div className="ayah-circle" style={{ border: "2px solid #16a34a", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {ayah.numberInSurah}
                </div>
                <p style={{ fontWeight: "bold" }}>{ayah.surah.englishName}</p>
             </div>

             {/* Teks Al-Quran */}
             <p className="arabic-text">{ayah.text}</p>
             
             {/* Terjemahan */}
             <p className="translation-text" style={{ color: "#475569", fontSize: "1.1rem" }}>{ayah.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}