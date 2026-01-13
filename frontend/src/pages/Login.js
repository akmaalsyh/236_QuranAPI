import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ditambahkan: Import Link

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.username);
        
        // Redirect berdasarkan role
        if (data.role === 'admin') {
            navigate('/admin-panel');
        } else {
            navigate('/');
        }
      } else {
        alert(data.message || "Login Gagal");
      }
    } catch (error) {
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <div className="surah-card" style={{ maxWidth: '400px', margin: 'auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#16a34a', marginBottom: '20px' }}>Login Al-Quran Ku</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            className="tab-btn" 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="tab-btn" 
            style={{ width: '100%', marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="tab-btn active" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Masuk
          </button>
        </form>
        
        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
          Belum punya akun? <Link to="/register" style={{ color: '#16a34a', fontWeight: 'bold', textDecoration: 'none' }}>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}