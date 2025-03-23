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

  const validateForm = () => {
    const newErrors = {};
    
    if (!recipeData.recipeName.trim()) {
      newErrors.recipeName = 'Recipe name is required';
    }
    
    if (!recipeData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!recipeData.cookingTime) {
      newErrors.cookingTime = 'Cooking time is required';
    } else if (isNaN(recipeData.cookingTime) || recipeData.cookingTime <= 0) {
      newErrors.cookingTime = 'Cooking time must be a positive number';
    }
    
    if (recipeData.calories && (isNaN(recipeData.calories) || recipeData.calories <= 0)) {
      newErrors.calories = 'Calories must be a positive number';
    }
    
    const emptyIngredients = recipeData.ingredients.some(ing => !ing.trim());
    if (emptyIngredients) {
      newErrors.ingredients = 'All ingredient fields must be filled';
    }
    
    const emptyInstructions = recipeData.instructions.some(inst => !inst.trim());
    if (emptyInstructions) {
      newErrors.instructions = 'All instruction steps must be filled';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


};

export default AddRecipe;
