import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/build" } });
    }
  }, [isLoggedIn, navigate]);

  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    description: '',
    cookingTime: '',
    calories: '',
    ingredients: [''],
    instructions: [''],
    image: null
  });
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  






};

export default AddRecipe;
