require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Update this to your client URL
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);

// Catchall handler to serve the React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
