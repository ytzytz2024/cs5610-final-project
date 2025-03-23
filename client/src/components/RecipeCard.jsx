import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, showSaveButton = true }) => {
  const { _id, recipeName, description, cookingTime, calories, userId } =
    recipe;

  // Image fallback handler
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=Recipe";
  };

  // Check if current user is the creator of this recipe
  const isCreator = localStorage.getItem("userId") === userId;

  return (
    <div className="recipe-card-wrapper">
      <div className="card recipe-card h-100">
        <img
          src={recipe.image || "https://via.placeholder.com/300x200?text=Recipe"}
          className="card-img-top"
          alt={recipeName}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
