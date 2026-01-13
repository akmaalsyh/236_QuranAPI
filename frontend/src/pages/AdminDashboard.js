import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [keys, setKeys] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const resUsers = await fetch('http://localhost:3000/api/admin/users', { headers });
            const dataUsers = await resUsers.json();
            setUsers(dataUsers);

            const resKeys = await fetch('http://localhost:3000/api/admin/all-keys', { headers });
            const dataKeys = await resKeys.json();
            setKeys(dataKeys);
        } catch (error) {
            console.error("Gagal mengambil data admin:", error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Navbar Khusus Admin */}
            <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', cursor: 'pointer' }} onClick={() => navigate('/')}>Al-Quran Ku</span>
                    <button onClick={() => navigate('/')} className="tab-btn">Baca Quran</button>
                    <button onClick={() => navigate('/admin-panel')} className="tab-btn active" style={{ borderBottom: '2px solid #16a34a' }}>Monitoring User</button>
                </div>
                <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="tab-btn" style={{ color: 'red' }}>Logout</button>
            </nav>

            <div className="container" style={{ maxWidth: '1200px', margin: 'auto', padding: '40px 20px' }}>
                <h1 style={{ color: '#16a34a', marginBottom: '30px' }}>Admin Panel - Monitoring Sistem</h1>
                
                {/* Tabel Pengguna */}
                <section style={{ marginBottom: '40px' }}>
                    <h3>Daftar Pengguna Aktif</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <thead style={{ background: '#16a34a', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '15px' }}>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Total API Keys</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} style={{ borderBottom: '1px solid #edf2f7', textAlign: 'center' }}>
                                    <td style={{ padding: '15px' }}>{u.id}</td>
                                    <td>{u.username}</td>
                                    <td>
                                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', background: u.role === 'admin' ? '#fee2e2' : '#dcfce7', color: u.role === 'admin' ? '#b91c1c' : '#166534' }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>{u.total_keys}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Grid API Keys */}
                <section>
                    <h3>Log Aktivitas API Keys</h3>
                    <div className="surah-grid">
                        {keys.map(k => (
                            <div key={k.id} className="surah-card" style={{ padding: '20px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Pemilik: <strong>{k.username}</strong></span>
                                    <span style={{ fontSize: '0.7rem', color: '#16a34a' }}>● Aktif</span>
                                </div>
                                <code style={{ color: '#16a34a', wordBreak: 'break-all', display: 'block', padding: '10px', background: '#f0fdf4', borderRadius: '6px' }}>
                                    {k.key_value}
                                </code>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}