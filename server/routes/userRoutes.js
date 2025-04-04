const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth0User = require('../middleware/auth0User');

// Protected routes that need Auth0 user
router.get('/profile', auth0User, userController.getUserProfile);
router.put('/profile', auth0User, userController.updateUserProfile);
router.post('/save-recipe', auth0User, userController.saveRecipe);
router.delete('/unsave-recipe/:id', auth0User, userController.unsaveRecipe);
router.get('/saved-recipes', auth0User, userController.getSavedRecipes);

module.exports = router;