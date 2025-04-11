// server/controllers/userController.js

const User = require('../models/User');
const Recipe = require('../models/Recipe');

// Get current user profile
exports.getUserProfile = async (req, res) => {
  try {
    // User is already loaded in the middleware
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Build profile object
    const profileFields = {};
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    
    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: profileFields },
      { new: true }
    );
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Save a recipe
exports.saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    
    // Verify recipe exists
    const recipe = await Recipe.findById(recipeId);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check if recipe is already saved
    const user = await User.findById(req.user._id);
    
    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ msg: 'Recipe already saved' });
    }
    
    // Add recipe to saved recipes
    user.savedRecipes.push(recipeId);
    await user.save();
    
    res.json(user.savedRecipes);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    res.status(500).send('Server Error');
  }
};

// Unsave a recipe
exports.unsaveRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Remove recipe from saved recipes
    user.savedRecipes = user.savedRecipes.filter(
      id => id.toString() !== req.params.id
    );
    
    await user.save();
    
    res.json(user.savedRecipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get saved recipes
exports.getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes }
    });
    
    res.json(savedRecipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};