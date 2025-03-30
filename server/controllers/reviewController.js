const Review = require('../models/Review');
const Recipe = require('../models/Recipe');

// Create a review
exports.createReview = async (req, res) => {
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
};

// Get all reviews for a recipe
exports.getReviewsByRecipe = async (req, res) => {
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
  };