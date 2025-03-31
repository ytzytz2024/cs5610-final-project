import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserService } from '../services/api';
import './RecipeCard.css';

const RecipeCard = ({ recipe, showSaveButton = true, onUnsave = null }) => {
  const navigate = useNavigate();
  const { _id, recipeName, description, cookingTime, calories, userId } = recipe;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Image fallback handler
  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.png';
  };

  // Check if current user is the creator of this recipe
  const currentUserId = localStorage.getItem('userId');
  const isCreator = currentUserId === userId;

  // Handle save recipe
  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!currentUserId) {
      navigate('/login', { state: { from: `/recipe/${_id}` } });
      return;
    }
    
    try {
      setIsSaving(true);
      await UserService.saveRecipe(_id);
      setIsSaved(true);
      setIsSaving(false);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setIsSaving(false);
      alert('Failed to save recipe. Please try again.');
    }
  };

  // Handle unsave recipe
  const handleUnsaveRecipe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onUnsave) {
      onUnsave(_id);
    }
  };

  return (
    <div className="recipe-card-wrapper">
      <div className="card recipe-card h-100">
        <img 
          src={recipe.image || '/images/placeholder.png'} 
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