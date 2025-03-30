const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/auth");

// Review routes
router.post("/", auth, reviewController.createReview);
router.get("/recipe/:recipeId", reviewController.getReviewsByRecipe);
router.get("/user/:userId", reviewController.getReviewsByUser);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", auth, reviewController.updateReview);
router.delete("/:id", auth, reviewController.deleteReview);

module.exports = router;