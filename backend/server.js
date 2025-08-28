const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const setupSocket = require('./sockets');

const authRoutes = require('./routes/authroutes');
const studyRoutes = require('./routes/StudyMaterials');
const mockTestRoutes = require('./routes/mockTestRoute');
const progressRoutes = require('./routes/progressRoute');
const forumRoutes = require('./routes/forumRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// REST APIs
app.use('/api/auth', authRoutes);
app.use('/api/study-materials', studyRoutes);
app.use('/api/mock-tests', mockTestRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/forum', forumRoutes);

app.get('/', (req, res) => {
  res.send('AspireHub Backend Running');
});

// HTTP + WebSocket server
const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB connection error:', err));

console.log("🧪 JWT_SECRET:", process.env.JWT_SECRET);
