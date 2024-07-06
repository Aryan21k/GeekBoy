const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Import room routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/file', fileRoutes);
app.use('/api', roomRoutes); // Use room routes

// Serve static files from the "Front-end" directory
app.use(express.static(path.join(__dirname, 'Front-end')));

// Serve the front-end application on all routes not handled by the API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front-end', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err.message || err.stack));
