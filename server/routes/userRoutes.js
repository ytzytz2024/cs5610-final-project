// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkJwt, verifyUser } = require('../middleware/auth0');

// User routes - All routes require Auth0 authentication
router.get('/profile', checkJwt, verifyUser, userController.getUserProfile);
router.put('/profile', checkJwt, verifyUser, userController.updateUserProfile);
router.post('/save-recipe', checkJwt, verifyUser, userController.saveRecipe);
router.delete('/unsave-recipe/:id', checkJwt, verifyUser, userController.unsaveRecipe);
router.get('/saved-recipes', checkJwt, verifyUser, userController.getSavedRecipes);

module.exports = router;