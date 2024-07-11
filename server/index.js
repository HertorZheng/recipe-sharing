require ("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);

// MongoDB connection
mongoose.connect(process.env.Mango_URL, {
  //mongodb+srv://hectorzheng4:Hector7126216!@hectorz.8d5rczo.mongodb.net/?retryWrites=true&w=majority&appName=HectorZ
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