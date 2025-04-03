import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [offset, setOffset] = useState(0);

  // Fetch restaurants using geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          fetchRestaurantsByCoordinates(latitude, longitude, 0);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to Vancouver if geolocation fails
          setCurrentLocation("Vancouver, BC");
          fetchRestaurants("Vancouver, BC", 0);
        }
      );
    } else {
      // Geolocation not supported, use Vancouver as fallback
      setCurrentLocation("Vancouver, BC");
      fetchRestaurants("Vancouver, BC", 0);
    }
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
    if (ingredients.length === 0) return;

    setIsLoading(true);

    // Navigate to search page with ingredients as query parameters
    navigate(`/search?ingredients=${ingredients.join(",")}`);
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

      {/* Restaurant suggestions section */}
      <section className="restaurants-section my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title mb-0">
            If you don't want to cook today
          </h2>
          <div className="carousel-controls">
            <button className="btn btn-sm btn-outline-secondary me-2">
              &lt;
            </button>
            <button className="btn btn-sm btn-outline-secondary">&gt;</button>
          </div>
        </div>

        <div className="row">
          {restaurants.map((restaurant) => (
            <div className="col-md-3 mb-4" key={restaurant.id}>
              <div className="card restaurant-card">
                <img
                  src={restaurant.image}
                  className="card-img-top"
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <div className="restaurant-meta">
                    <span>{restaurant.timeRange}</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <button className="btn btn-success w-100 mt-2">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
