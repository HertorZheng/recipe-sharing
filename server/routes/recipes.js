const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const Recipe = require('../models/Recipe');

// Fetch all recipes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch a single recipe by ID
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recipe submission
router.post('/recipes', multer.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const recipe = new Recipe({ title, description, imageUrl });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a recipe
router.put('/recipes/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a recipe
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;