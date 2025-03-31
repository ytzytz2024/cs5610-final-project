import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RecipeService, ReviewService, UserService } from "../services/api";
import "./RecipeDetail.css";

const RecipeDetail = ({ isLoggedIn }) => {
  // Check if current user is creator of recipe
  const userId = localStorage.getItem("userId");
  const isCreator = recipe?.userId === userId;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const recipeResponse = await RecipeService.getRecipeById(id);
        setRecipe(recipeResponse.data);

        const reviewsResponse = await ReviewService.getReviewsByRecipe(id);
        setReviews(reviewsResponse.data);

        // Check if the recipe is saved by the current user
        if (isLoggedIn) {
          try {
            const savedRecipesResponse = await UserService.getSavedRecipes();
            const savedRecipes = savedRecipesResponse.data;
            if (savedRecipes.some((recipe) => recipe._id === id)) {
              setIsSaved(true);
            }
          } catch (err) {
            console.error("Error checking saved status:", err);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to load recipe details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, isLoggedIn]);


  const handleSaveRecipe = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }

    try {
      setSavingRecipe(true);
      await UserService.saveRecipe(id);
      setIsSaved(true);
      setSavingRecipe(false);
      alert("Recipe saved successfully!");
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe. Please try again.");
      setSavingRecipe(false);
    }
  };

  const handleDeleteRecipe = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone."
      )
    ) {
      try {
        setDeletingRecipe(true);
        await RecipeService.deleteRecipe(id);
        setDeletingRecipe(false);
        alert("Recipe deleted successfully!");
        navigate("/profile");
      } catch (err) {
        console.error("Error deleting recipe:", err);
        alert("Failed to delete recipe. Please try again.");
        setDeletingRecipe(false);
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }

    if (!reviewText.trim()) {
      return;
    }

    try {
      setSubmittingReview(true);
      const response = await ReviewService.createReview({
        recipeId: id,
        comment: reviewText
      });

      // Add the new review to the top of the reviews list
      setReviews([response.data, ...reviews]);
      setReviewText("");
      setSubmittingReview(false);
    } catch (err) {
      console.error("Error posting review:", err);
      alert("Failed to post review. Please try again.");
      setSubmittingReview(false);
    }
  };

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }

    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        setDeletingReviewId(reviewId);
        await ReviewService.deleteReview(reviewId);
        
        // Remove the deleted review from the state
        setReviews(reviews.filter(review => review._id !== reviewId));
        setDeletingReviewId(null);
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review. Please try again.");
        setDeletingReviewId(null);
      }
    }
  };







};

export default RecipeDetail;
