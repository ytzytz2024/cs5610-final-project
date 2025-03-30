const Recipe = require('../models/Recipe');
const path = require('path');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
      
      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
      
      res.status(500).send('Server Error');
    }
  };