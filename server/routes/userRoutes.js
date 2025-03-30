const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);
router.post('/save-recipe', auth, userController.saveRecipe);
router.delete('/unsave-recipe/:id', auth, userController.unsaveRecipe);
router.get('/saved-recipes', auth, userController.getSavedRecipes);

module.exports = router;