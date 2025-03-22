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
      {
        id: 1,
        name: "The Rustic Table",
        image: "/placeholder-restaurant.jpg",
        priceRange: "$$",
        timeRange: "15-20 min",
      },
      {
        id: 2,
        name: "Fusion Kitchen",
        image: "/placeholder-restaurant.jpg",
        priceRange: "$$$",
        timeRange: "20-25 min",
      },
      {
        id: 3,
        name: "Bistro Corner",
        image: "/placeholder-restaurant.jpg",
        priceRange: "$$",
        timeRange: "10-15 min",
      },
      {
        id: 4,
        name: "Asian Fusion",
        image: "/placeholder-restaurant.jpg",
        priceRange: "$$$",
        timeRange: "25-30 min",
      },
    ];

    setRestaurants(mockRestaurants);
  }, []);

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
      window.location.href = `/search?ingredients=${ingredients.join(",")}`;
    }, 1000);
  };

  return (
    <div className="home-container">
      <section className="kitchen-section">
        <h1 className="text-center my-4">What's in your kitchen?</h1>
        <p className="text-center mb-4">
          Enter ingredients you have and let our AI suggest delicious recipes
        </p>

        <div className="search-container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleAddIngredient}
            >
              +
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="ingredients-tags mb-3">
              {ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient-tag">
                  {ingredient}
                  <button
                    className="remove-tag"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            className="btn btn-success w-100"
            onClick={handleFindRecipes}
            disabled={ingredients.length === 0 || isLoading}
          >
            {isLoading ? "Finding Recipes..." : "Find Recipes"}
          </button>
        </div>
      </section>

      {/* Featured Recipes Section for anonymous users */}
      <section className="featured-recipes my-5">
        <h2 className="section-title">Popular Recipes</h2>
        <div className="row">
        <div className="col-md-4 mb-4">
            <div className="card recipe-card">
              <img
                src="/placeholder-recipe1.jpg"
                className="card-img-top"
                alt="Recipe"
              />
              <div className="card-body">
                <h5 className="card-title">Chicken and Rice Casserole</h5>
                <p className="card-text">
                  A comforting and simple dish that uses your available
                  ingredients efficiently.
                </p>
                <div className="recipe-meta">
                  <span>35 min</span>
                  <span>410 calories</span>
                </div>
                <Link to="/recipe/1" className="btn btn-outline-success">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  );
}
