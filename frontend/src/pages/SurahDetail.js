import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SurahDetail() {
  const { number } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Meminta 3 edisi sekaligus: Arab, Latin, dan Terjemahan Indonesia
    fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,id.indonesian,en.transliteration`)
      .then(res => res.json())
      .then(result => {
        const arab = result.data[0].ayahs;
        const indo = result.data[1].ayahs;
        const latin = result.data[2].ayahs;

        // Menggabungkan data ayat
        const combined = arab.map((ayah, i) => ({
          ...ayah,
          translation: indo[i].text,
          transliteration: latin[i].text
        }));

        setData({ ...result.data[0], ayahs: combined });
      });
  }, [number]);

  if (!data) return <div className="container">Memuat Ayat...</div>;

  return (
    <div className="container detail-container">
      <Link to="/" className="back-link">← Kembali ke Daftar</Link>
      
      <div className="surah-header">
        <h1 className="arabic-header">{data.name}</h1>
        <p className="latin-header">{data.englishName} • {data.numberOfAyahs} Ayat</p>
      </div>

      <div className="ayah-list">
        {data.ayahs.map(a => (
          <div key={a.number} className="ayah-item-wrapper">
            <div className="ayah-tools">
              <div className="ayah-circle">{a.numberInSurah}</div>
            </div>
            <div className="ayah-content">
              <p className="arabic-text">{a.text}</p>
              <p className="transliteration-text">{a.transliteration}</p>
              <p className="translation-text">{a.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}