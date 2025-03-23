import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./RecipeCard.css";

export default function RecipeCard({ recipe, showSaveButton = true }) {
  const { _id, recipeName, description, cookingTime, calories, userId } = recipe;

  // Image fallback handler
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Recipe';
  };

  // Check if current user is the creator of this recipe
  const isCreator = localStorage.getItem('userId') === userId;

  return <div>RecipeCard</div>;
}
