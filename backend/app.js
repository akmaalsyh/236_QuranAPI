const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const quranRoutes = require('./routes/quran.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/v1/quran', quranRoutes);

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
