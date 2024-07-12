require("dotenv").config();
console.log('MongoDB URL:', process.env.MONGODB_URL); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://recipe-sharing-1.onrender.com'
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);

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
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
