import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        alert("Registrasi Berhasil! Silakan Login.");
        navigate('/login');
      } else {
        const data = await res.json();
        alert(data.error || "Registrasi Gagal!");
      }
    } catch (error) {
      alert("Gagal terhubung ke server. Pastikan backend jalan.");
    }
  };

  return (
    <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
      <div className="surah-card" style={{ 
        maxWidth: '400px', 
        margin: 'auto', 
        padding: '30px', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ color: '#16a34a', marginBottom: '20px' }}>Daftar Akun Al-Quran Ku</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Username" 
            className="tab-btn" 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setForm({...form, username: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="tab-btn" 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setForm({...form, password: e.target.value})} 
            required 
          />
          <select 
            className="tab-btn" 
            style={{ width: '100%', marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box', background: 'white' }} 
            onChange={(e) => setForm({...form, role: e.target.value})}
          >
            <option value="user">User (Mahasiswa)</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            type="submit" 
            className="tab-btn active" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Daftar
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
          Sudah punya akun? <Link to="/login" style={{ color: '#16a34a', fontWeight: 'bold', textDecoration: 'none' }}>Login di sini</Link>
        </p>
      </div>
    </div>
  );
}