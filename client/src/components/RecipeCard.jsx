import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecipeCard.css';

const RecipeCard = ({ recipe, showSaveButton = true }) => {
  const { _id, recipeName, description, cookingTime, calories, userId } = recipe;
  
  // Image fallback handler
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Recipe';
  };

  // Check if current user is the creator of this recipe
  const isCreator = localStorage.getItem('userId') === userId;

  return (
    <div className="recipe-card-wrapper">
      <div className="card recipe-card h-100">
        <img 
          src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe'} 
          className="card-img-top" 
          alt={recipeName}
          onError={handleImageError}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipeName}</h5>
          <p className="card-text flex-grow-1">{description?.substring(0, 100)}{description?.length > 100 ? '...' : ''}</p>
          <div className="recipe-meta">
            <span>{cookingTime ? `${cookingTime} min` : 'Time N/A'}</span>
            <span>{calories ? `${calories} calories` : 'Calories N/A'}</span>
          </div>
          <div className="card-actions">
            <Link to={`/recipe/${_id}`} className="btn btn-outline-success view-btn">
              View
            </Link>
            
            {showSaveButton && !isCreator && (
              <button className="btn btn-light save-btn">
                Save
              </button>
            )}
            
            {isCreator && (
              <Link to={`/recipe/edit/${_id}`} className="btn btn-light edit-btn">
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
    description: PropTypes.string,
    cookingTime: PropTypes.number,
    calories: PropTypes.number,
    userId: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  showSaveButton: PropTypes.bool
};

export default RecipeCard;