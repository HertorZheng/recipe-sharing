const mongoose = require('mongoose');
// User Schema

const users = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  }
});

// Recipe Schema
const recipes = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  }
});

// Models
const User = mongoose.model('User', users);
const Recipe = mongoose.model('Recipe', recipes);

module.exports = {
  User,
  Recipe
};

