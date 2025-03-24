const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  
});

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  
});

// @route   POST /api/users/save-recipe
// @desc    Save a recipe to user's saved recipes
// @access  Private
router.post('/save-recipe', auth, async (req, res) => {
  
});

// @route   DELETE /api/users/unsave-recipe/:id
// @desc    Remove a recipe from user's saved recipes
// @access  Private
router.delete('/unsave-recipe/:id', auth, async (req, res) => {
  
});

// @route   GET /api/users/saved-recipes
// @desc    Get user's saved recipes
// @access  Private
router.get('/saved-recipes', auth, async (req, res) => {
  
});

module.exports = router;