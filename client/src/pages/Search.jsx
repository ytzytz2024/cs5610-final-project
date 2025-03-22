import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('relevance');
  
  // Get query parameters from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredientsParam = queryParams.get('ingredients');
  
  const fetchRecipes = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For iteration 1, we'll use mock data
      // In the future, this would be a real API call
      
      // Simulating API response delay
      setTimeout(() => {
        // Mock data for search results
        const mockRecipes = [
          {
            _id: '1',
            recipeName: 'Chicken and Rice Casserole with Tomato',
            description: 'A comforting and simple dish that uses your available ingredients efficiently.',
            cookingTime: 35,
            calories: 410,
            userId: '123',
            image: 'https://via.placeholder.com/300x200?text=Chicken+Rice+Casserole'
          },
          {
            _id: '2',
            recipeName: 'Tomato Chicken Skillet with Rice',
            description: 'A quick one-pan meal perfect for weeknight dinners.',
            cookingTime: 25,
            calories: 380,
            userId: '456',
            image: 'https://via.placeholder.com/300x200?text=Tomato+Chicken+Skillet'
          },
          {
            _id: '3',
            recipeName: 'Mediterranean Chicken Rice Bowl',
            description: 'A healthy and flavorful bowl packed with Mediterranean-inspired ingredients.',
            cookingTime: 30,
            calories: 450,
            userId: '789',
            image: 'https://via.placeholder.com/300x200?text=Mediterranean+Bowl'
          }
        ];
        
        setRecipes(mockRecipes);
        setIsLoading(false);
      }, 1000);
      
      // In future iterations, this would be:
      // const response = await axios.get(`/api/recipes/search?query=${query}`);
      // setRecipes(response.data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      setIsLoading(false);
      console.error('Search error:', err);
    }
  };
  
  const fetchPopularRecipes = () => {
    setIsLoading(true);
    
    // Mock data for popular recipes
    setTimeout(() => {
      const popularRecipes = [
        {
          _id: '4',
          recipeName: 'Classic Spaghetti Bolognese',
          description: 'Traditional Italian pasta dish with a rich meat sauce.',
          cookingTime: 45,
          calories: 520,
          userId: '123',
          image: 'https://via.placeholder.com/300x200?text=Spaghetti+Bolognese'
        },
        {
          _id: '5',
          recipeName: 'Vegetable Stir Fry',
          description: 'Quick and healthy vegetable stir fry with your choice of protein.',
          cookingTime: 20,
          calories: 320,
          userId: '456',
          image: 'https://via.placeholder.com/300x200?text=Vegetable+Stir+Fry'
        },
        {
          _id: '6',
          recipeName: 'Homemade Pizza',
          description: 'Easy homemade pizza with your favorite toppings.',
          cookingTime: 40,
          calories: 580,
          userId: '789',
          image: 'https://via.placeholder.com/300x200?text=Homemade+Pizza'
        },
        {
          _id: '7',
          recipeName: 'Chicken Caesar Salad',
          description: 'Classic Caesar salad with grilled chicken and homemade dressing.',
          cookingTime: 25,
          calories: 380,
          userId: '101',
          image: 'https://via.placeholder.com/300x200?text=Caesar+Salad'
        }
      ];
      
      setRecipes(popularRecipes);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    // If there are ingredients in URL, set them as search query and trigger search
    if (ingredientsParam) {
      setSearchQuery(ingredientsParam.replace(',', ', '));
      fetchRecipes(ingredientsParam);
    } else {
      // Otherwise, fetch some recent/popular recipes
      fetchPopularRecipes();
    }
  }, [ingredientsParam]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery);
      
      // Update URL with search query
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('query', searchQuery);
      window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
    }
  };
  
  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    
    // Sort the recipes array based on selected sorting option
    let sortedRecipes = [...recipes];
    
    if (newSortOrder === 'time-asc') {
      sortedRecipes.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (newSortOrder === 'time-desc') {
      sortedRecipes.sort((a, b) => b.cookingTime - a.cookingTime);
    } else if (newSortOrder === 'calories-asc') {
      sortedRecipes.sort((a, b) => a.calories - b.calories);
    } else if (newSortOrder === 'calories-desc') {
      sortedRecipes.sort((a, b) => b.calories - a.calories);
    }
    // For 'relevance', we keep the original order from the API
    
    setRecipes(sortedRecipes);
  };
  
  return (
    <div className="search-page-container">
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search ingredients (e.g. chicken, rice, tomatoes)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="btn btn-success" 
              type="submit"
              disabled={isLoading}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      <div className="results-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="results-title">
            {recipes.length > 0 ? `${recipes.length} Recipe Results` : 'Popular Recipes'}
            {searchQuery && ` for "${searchQuery}"`}
          </h2>
          
          <div className="sort-control">
            <label className="me-2">Sort by:</label>
            <select 
              className="form-select form-select-sm" 
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="time-asc">Cooking Time (Low to High)</option>
              <option value="time-desc">Cooking Time (High to Low)</option>
              <option value="calories-asc">Calories (Low to High)</option>
              <option value="calories-desc">Calories (High to Low)</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Searching for recipes...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center my-5">
            <p>No recipes found. Try different ingredients or keywords.</p>
          </div>
        ) : (
          <div className="row">
            {recipes.map(recipe => (
              <div className="col-md-4 mb-4" key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;