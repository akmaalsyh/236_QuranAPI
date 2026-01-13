import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SurahDetail from './pages/SurahDetail';
import JuzDetail from './pages/JuzDetail';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';


// Komponen pembungkus untuk memproteksi halaman
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes - Semua Role yang Login bisa akses */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/surah/:number" element={
          <ProtectedRoute>
            <SurahDetail />
          </ProtectedRoute>
        } />
        <Route path="/juz/:number" element={
          <ProtectedRoute>
            <JuzDetail />
          </ProtectedRoute>
        } />
        
        {/* Route Khusus User untuk Generate API Key */}
        <Route path="/user-panel" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        {/* Route Khusus Admin */}
        <Route path="/admin-panel" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Catch-all route: arahkan ke login jika path tidak ditemukan */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;