import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [listSurah, setListSurah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("surah");
  const navigate = useNavigate();

  // Ambil data user dari localStorage
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/surah-list", {
          headers: { "x-api-key": "QURAN123" }
        });
        const data = await response.json();
        setListSurah(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* NAVBAR REVISI: Penambahan navigasi Admin */}
      <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
           <a href="/" className="nav-logo" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#16a34a", textDecoration: "none" }}>Al-Quran Ku</a>
           {/* Link bantuan untuk navigasi Admin */}
           {role === "admin" && (
             <button onClick={() => navigate("/admin-panel")} className="tab-btn" style={{ padding: "8px 12px", cursor: "pointer", borderRadius: "8px", border: "1px solid #16a34a", background: "#f0fdf4", color: "#16a34a", fontSize: "0.8rem", fontWeight: "bold" }}>
                Ganti ke Panel Monitoring
             </button>
           )}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "0.9rem", color: "#64748b" }}>Halo, <strong>{username}</strong> ({role})</span>
          
          {role === "user" && (
            <button onClick={() => navigate("/user-panel")} className="tab-btn" style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "8px", border: "1px solid #16a34a", background: "none", color: "#16a34a" }}>
              Panel API Key
            </button>
          )}

          <button onClick={handleLogout} className="tab-btn" style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "8px", border: "1px solid #ef4444", background: "none", color: "#ef4444" }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: "1200px", margin: "auto", padding: "40px 20px" }}>
        <section id="tentang" style={{ marginBottom: "50px", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "15px" }}>Baca Al-Quran Setiap Hari</h1>
          <p style={{ color: "#64748b", maxWidth: "700px", margin: "auto", lineHeight: "1.6" }}>
            Platform <strong>Al-Quran Ku</strong> hadir untuk memudahkan Anda membaca dan memahami isi Al-Quran secara digital. 
            {role === "admin" ? " Sebagai Admin, Anda dapat memantau aktivitas user melalui panel monitoring." : " Silakan gunakan API Key Anda untuk integrasi layanan."}
          </p>
        </section>

        <div className="tabs" style={{ display: "flex", gap: "20px", borderBottom: "2px solid #edf2f7", marginBottom: "30px" }}>
          <button 
            className={tab === "surah" ? "tab-btn active" : "tab-btn"} 
            onClick={() => setTab("surah")}
            style={{ padding: "10px 20px", cursor: "pointer", border: "none", background: "none", fontWeight: "bold", borderBottom: tab === "surah" ? "3px solid #16a34a" : "none", color: tab === "surah" ? "#16a34a" : "#a0aec0" }}
          >
            Surah
          </button>
          <button 
            className={tab === "juz" ? "tab-btn active" : "tab-btn"} 
            onClick={() => setTab("juz")}
            style={{ padding: "10px 20px", cursor: "pointer", border: "none", background: "none", fontWeight: "bold", borderBottom: tab === "juz" ? "3px solid #16a34a" : "none", color: tab === "juz" ? "#16a34a" : "#a0aec0" }}
          >
            Juz
          </button>
        </div>

        {tab === "surah" ? (
          loading ? <p style={{ textAlign: "center" }}>Memuat Surah...</p> : (
            <div className="surah-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {listSurah.map((s) => (
                <div 
                  key={s.number} 
                  className="surah-card" 
                  onClick={() => navigate(`/surah/${s.number}`)} 
                  style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", transition: "0.3s" }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <div className="surah-info" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <div className="surah-number-wrapper" style={{ width: "40px", height: "40px", border: "2px solid #e2e8f0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                      <span className="surah-number">{s.number}</span>
                    </div>
                    <div className="surah-details">
                      <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{s.englishName}</h3>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>{s.revelationType} • {s.numberOfAyahs} Ayat</p>
                    </div>
                  </div>
                  <div className="surah-arabic" style={{ fontSize: "1.4rem", color: "#16a34a", fontWeight: "bold" }}>{s.name}</div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="surah-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div 
                key={i+1} 
                className="surah-card" 
                onClick={() => navigate(`/juz/${i+1}`)} 
                style={{ textAlign: "center", padding: "30px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", cursor: "pointer" }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>Juz {i+1}</h3>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Baca Juz {i+1}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}