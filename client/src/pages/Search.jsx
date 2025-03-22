import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
        {/* Results will be displayed here */}
      </div>
    </div>
  );
};

export default Search;