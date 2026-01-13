import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
    const [apiKey, setApiKey] = useState('');
    const [myKeys, setMyKeys] = useState([]); 
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    // 1. Ambil daftar key saat halaman pertama kali dimuat
    useEffect(() => {
        fetchMyKeys();
    }, []);

    const fetchMyKeys = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/keys/my-keys', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setMyKeys(data);
            }
        } catch (error) {
            console.error("Gagal mengambil daftar key:", error);
        }
    };

    const handleGenerate = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/keys/generate', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Tambahkan ini agar request lebih stabil
                }
            });
            const data = await res.json();
            
            if (res.ok) {
                // Tampilkan key baru di kotak hijau
                setApiKey(data.api_key); 
                
                // REVISI PENTING: Paksa pengambilan data ulang dari database 
                // agar tabel "Daftar API Key Saya" langsung terupdate secara real-time
                await fetchMyKeys(); 
                
                alert("Berhasil membuat API Key baru!");
            } else {
                alert(data.message || "Gagal membuat API Key");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan pada server");
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', cursor: 'pointer' }} onClick={() => navigate('/')}>Al-Quran Ku</span>
                    <button onClick={() => navigate('/')} className="tab-btn" style={{ padding: '8px 15px', cursor: 'pointer', borderRadius: '8px', border: '1px solid #16a34a', background: 'none', color: '#16a34a', fontWeight: 'bold' }}>
                        Kembali Baca Quran
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Halo, <strong>{username}</strong></span>
                    <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="tab-btn" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>
            </nav>

            <div className="container" style={{ maxWidth: '1000px', margin: 'auto', padding: '40px 20px' }}>
                <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Panel Pengguna</h2>
                
                <div className="surah-card" style={{ padding: '30px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <p style={{ color: '#64748b', marginBottom: '20px' }}>Gunakan tombol di bawah untuk membuat kunci akses API baru Anda.</p>
                    <button onClick={handleGenerate} className="tab-btn active" style={{ padding: '12px 25px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                        Generate API Key Baru
                    </button>
                    
                    {apiKey && (
                        <div style={{ marginTop: '25px', background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #16a34a', animation: 'fadeIn 0.5s' }}>
                            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#16a34a', fontSize: '0.9rem' }}>KEY BARU ANDA BERHASIL DIBUAT:</p>
                            <code style={{ fontSize: '1.2rem', color: '#166534', wordBreak: 'break-all', fontWeight: 'bold', backgroundColor: '#ffffff', padding: '5px 10px', borderRadius: '4px', border: '1px solid #dcfce7' }}>{apiKey}</code>
                        </div>
                    )}
                </div>

    
            </div>
        </div>
    );
}