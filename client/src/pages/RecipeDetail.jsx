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
};

export default RecipeDetail;
