import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

export default function Home({ isLoggedIn }) {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // For demonstration in iteration 1, we'll use mock data
  // In future iterations, this will be replaced with actual API calls
  useEffect(() => {
    // Mock data for nearby restaurants (would come from Yelp API later)
    const mockRestaurants = [
      { id: 1, name: 'The Rustic Table', image: '/placeholder-restaurant.jpg', priceRange: '$$', timeRange: '15-20 min' },
      { id: 2, name: 'Fusion Kitchen', image: '/placeholder-restaurant.jpg', priceRange: '$$$', timeRange: '20-25 min' },
      { id: 3, name: 'Bistro Corner', image: '/placeholder-restaurant.jpg', priceRange: '$$', timeRange: '10-15 min' },
      { id: 4, name: 'Asian Fusion', image: '/placeholder-restaurant.jpg', priceRange: '$$$', timeRange: '25-30 min' }
    ];
    
    setRestaurants(mockRestaurants);
  }, []);

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleFindRecipes = () => {
    // This would be connected to AI API in future iterations
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to search results - to be implemented with React Router
      window.location.href = `/search?ingredients=${ingredients.join(',')}`;
    }, 1000);
  };

  return <div>Home</div>;
}
