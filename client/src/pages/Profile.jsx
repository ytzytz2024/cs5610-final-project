import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './Profile.css';

const Profile = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState('created');
  const [loading, setLoading] = useState(true);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/profile' } });
    } else {
      fetchUserData();
    }
  }, [isLoggedIn, navigate]);
  
  const fetchUserData = async () => {
    setLoading(true);
    
    try {
      // For iteration 1, we'll use mock data
      // In future iterations, this would be actual API calls:
      // const userRes = await axios.get('/api/users/profile');
      // const createdRes = await axios.get('/api/recipes/user');
      // const savedRes = await axios.get('/api/users/saved-recipes');
      
      // Simulate API delay
      setTimeout(() => {
        // Mock user data
        const mockUser = {
          _id: '123',
          username: 'Chen XiaoMei',
          email: 'xiaomei.chen@example.com',
          preferences: ['Vegetarian', 'Low Carb']
        };
        
        // Mock created recipes
        const mockCreatedRecipes = [
          {
            _id: '1',
            recipeName: 'Fresh Basil Pasta',
            description: 'A simple and flavorful pasta dish with fresh tomatoes and basil.',
            cookingTime: 30,
            calories: 350,
            userId: '123',
            image: '/images/placeholder.png'
          },
          {
            _id: '2',
            recipeName: 'Mediterranean Salad',
            description: 'A refreshing salad with feta cheese, olives, and vegetables.',
            cookingTime: 15,
            calories: 220,
            userId: '123',
            image: '/images/placeholder.png'
          },
          {
            _id: '3',
            recipeName: 'Berry Smoothie Bowl',
            description: 'A nutritious breakfast bowl with mixed berries and granola.',
            cookingTime: 10,
            calories: 280,
            userId: '123',
            image: '/images/placeholder.png'
          }
        ];
        
        // Mock saved recipes
        const mockSavedRecipes = [
          {
            _id: '4',
            recipeName: 'Vegetable Curry',
            description: 'A flavorful vegetable curry with coconut milk.',
            cookingTime: 35,
            calories: 320,
            userId: '456',
            image: '/images/placeholder.png'
          },
          {
            _id: '5',
            recipeName: 'Quinoa Bowl',
            description: 'A healthy quinoa bowl with avocado and chickpeas.',
            cookingTime: 20,
            calories: 280,
            userId: '789',
            image: '/images/placeholder.png'
          },
          {
            _id: '6',
            recipeName: 'Zucchini Noodles',
            description: 'Low-carb zucchini noodles with tomato sauce.',
            cookingTime: 25,
            calories: 180,
            userId: '101',
            image: '/images/placeholder.png'
          }
        ];
        
        setUser(mockUser);
        setCreatedRecipes(mockCreatedRecipes);
        setSavedRecipes(mockSavedRecipes);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setLoading(false);
    }
  };
  
  if (!isLoggedIn) {
    return null; // Return null for initial render before redirect
  }
  
  return (
    <div className="profile-container">
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading profile...</p>
        </div>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-avatar">
                {user?.username.charAt(0)}
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{user?.username}</h1>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-preferences">
                  {user?.preferences.map((pref, index) => (
                    <span key={index} className="preference-tag">{pref}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              className="btn btn-outline-success edit-profile-btn"
              onClick={() => alert('Edit profile functionality will be implemented in future iterations.')}
            >
              Edit Profile
            </button>
          </div>
          
          <div className="recipes-section">
            <div className="recipes-tabs">
              <button 
                className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
                onClick={() => setActiveTab('created')}
              >
                My Created Recipes
              </button>
              <button 
                className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Recipes
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'created' ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-title">My Created Recipes</h2>
                    <Link to="/build" className="btn btn-success">
                      <i className="bi bi-plus"></i> New Recipe
                    </Link>
                  </div>
                  
                  {createdRecipes.length === 0 ? (
                    <div className="empty-state">
                      <p>You haven't created any recipes yet.</p>
                      <Link to="/build" className="btn btn-success">Create Your First Recipe</Link>
                    </div>
                  ) : (
                    <div className="row">
                      {createdRecipes.map(recipe => (
                        <div className="col-md-4 mb-4" key={recipe._id}>
                          <RecipeCard recipe={recipe} showSaveButton={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="section-title">Saved Recipes</h2>
                  
                  {savedRecipes.length === 0 ? (
                    <div className="empty-state">
                      <p>You haven't saved any recipes yet.</p>
                      <Link to="/search" className="btn btn-success">Discover Recipes</Link>
                    </div>
                  ) : (
                    <div className="row">
                      {savedRecipes.map(recipe => (
                        <div className="col-md-4 mb-4" key={recipe._id}>
                          <RecipeCard recipe={recipe} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;