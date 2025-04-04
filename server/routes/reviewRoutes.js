const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth0User = require("../middleware/auth0User");

// Review routes
router.post("/", auth0User, reviewController.createReview);
router.get("/recipe/:recipeId", reviewController.getReviewsByRecipe);
router.get("/user/:userId", reviewController.getReviewsByUser);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", auth0User, reviewController.updateReview);
router.delete("/:id", auth0User, reviewController.deleteReview);

module.exports = router;