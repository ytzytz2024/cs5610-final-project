// server/routes/reviewRoutes.js

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { checkJwt, verifyUser } = require('../middleware/auth0');

// Public routes - no authentication required
router.get("/recipe/:recipeId", reviewController.getReviewsByRecipe);
router.get("/user/:userId", reviewController.getReviewsByUser);
router.get("/:id", reviewController.getReviewById);

// Protected routes - require authentication
router.post("/", checkJwt, verifyUser, reviewController.createReview);
router.put("/:id", checkJwt, verifyUser, reviewController.updateReview);
router.delete("/:id", checkJwt, verifyUser, reviewController.deleteReview);

module.exports = router;