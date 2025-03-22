import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Will implement search functionality later
      console.log('Searching for:', searchQuery);
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