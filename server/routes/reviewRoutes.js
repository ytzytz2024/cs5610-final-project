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
  try {
    const review = await Review.findById(req.params.id).populate({
      path: 'userId',
      select: 'username'
    });
    
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    res.json(review);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { comment } = req.body;
    
    // Find review
    let review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    // Check user owns the review
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Update review
    review.comment = comment;
    review.timestamp = Date.now();
    
    await review.save();
    
    // Populate user data for the response
    const updatedReview = await Review.findById(review._id).populate({
      path: 'userId',
      select: 'username'
    });
    
    res.json(updatedReview);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    // Check user owns the review
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    // Remove review reference from recipe
    await Recipe.updateOne(
      { _id: review.recipeId },
      { $pull: { reviews: review._id } }
    );
    
    // Delete review
    await review.remove();
    
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;