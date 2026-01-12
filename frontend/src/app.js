// Di dalam App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import SurahDetail from './pages/SurahDetail';
import JuzDetail from './pages/JuzDetail'; // Import file baru

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surah/:number" element={<SurahDetail />} />
        <Route path="/juz/:number" element={<JuzDetail />} /> {/* Tambahkan ini */}
      </Routes>
    </Router>
  );
}

export default App;