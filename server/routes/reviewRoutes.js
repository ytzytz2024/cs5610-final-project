const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
      const { recipeId, comment } = req.body;
      
      // Check if recipe exists
      const recipe = await Recipe.findById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({ msg: 'Recipe not found' });
      }
      
      // Create new review
      const newReview = new Review({
        userId: req.user.id,
        recipeId,
        comment
      });
      
      // Save review
      const review = await newReview.save();
      
      // Add review to recipe's reviews array
      recipe.reviews.push(review._id);
      await recipe.save();
      
      // Populate user data for the response
      const populatedReview = await Review.findById(review._id).populate({
        path: 'userId',
        select: 'username'
      });
      
      res.json(populatedReview);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   GET /api/reviews/recipe/:recipeId
// @desc    Get all reviews for a recipe
// @access  Public
router.get('/recipe/:recipeId', async (req, res) => {
    try {
      const reviews = await Review.find({ recipeId: req.params.recipeId })
        .sort({ timestamp: -1 })
        .populate({
          path: 'userId',
          select: 'username'
        });
      
      res.json(reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   GET /api/reviews/:id
// @desc    Get review by ID
// @access  Public
router.get('/:id', async (req, res) => {
  
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', auth, async (req, res) => {
  
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  
});

// @route   GET /api/reviews/user/:userId
// @desc    Get all reviews by a user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  
});

module.exports = router;