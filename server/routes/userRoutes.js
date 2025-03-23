const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Check if username is taken
    user = await User.findOne({ username });
    
    if (user) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    
    // Create new user
    user = new User({
      username,
      email,
      password
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Save user to database
    await user.save();
    
    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          userId: user.id,
          username: user.username
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create and return JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          userId: user.id,
          username: user.username
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Build profile object
    const profileFields = {};
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;
    
    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/save-recipe
// @desc    Save a recipe to user's saved recipes
// @access  Private
router.post('/save-recipe', auth, async (req, res) => {
  try {
    const { recipeId } = req.body;
    
    // Verify recipe exists
    const recipe = await Recipe.findById(recipeId);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check if recipe is already saved
    const user = await User.findById(req.user.id);
    
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
});

// @route   DELETE /api/users/unsave-recipe/:id
// @desc    Remove a recipe from user's saved recipes
// @access  Private
router.delete('/unsave-recipe/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
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
});

// @route   GET /api/users/saved-recipes
// @desc    Get user's saved recipes
// @access  Private
router.get('/saved-recipes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes }
    });
    
    res.json(savedRecipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;