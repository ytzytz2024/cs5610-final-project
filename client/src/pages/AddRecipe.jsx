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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };
  
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = value;
    setRecipeData({
      ...recipeData,
      ingredients: newIngredients
    });
  };
  
  const addIngredientField = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, '']
    });
  };
  
  const removeIngredientField = (index) => {
    if (recipeData.ingredients.length > 1) {
      const newIngredients = [...recipeData.ingredients];
      newIngredients.splice(index, 1);
      setRecipeData({
        ...recipeData,
        ingredients: newIngredients
      });
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipeData.instructions];
    newInstructions[index] = value;
    setRecipeData({
      ...recipeData,
      instructions: newInstructions
    });
  };
  
  const addInstructionField = () => {
    setRecipeData({
      ...recipeData,
      instructions: [...recipeData.instructions, '']
    });
  };
  
  const removeInstructionField = (index) => {
    if (recipeData.instructions.length > 1) {
      const newInstructions = [...recipeData.instructions];
      newInstructions.splice(index, 1);
      setRecipeData({
        ...recipeData,
        instructions: newInstructions
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipeData({
        ...recipeData,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };




};

export default AddRecipe;
