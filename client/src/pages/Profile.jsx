import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      // Simulate API delay
      setTimeout(() => {
        // Mock user data
        const mockUser = {
          _id: '123',
          username: 'Chen XiaoMei',
          email: 'xiaomei.chen@example.com',
          preferences: ['Vegetarian', 'Low Carb']
        };
        
        setUser(mockUser);
        setCreatedRecipes([]);
        setSavedRecipes([]);
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
                  
                  <div className="empty-state">
                    <p>You haven't created any recipes yet.</p>
                    <Link to="/build" className="btn btn-success">Create Your First Recipe</Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="section-title">Saved Recipes</h2>
                  
                  <div className="empty-state">
                    <p>You haven't saved any recipes yet.</p>
                    <Link to="/search" className="btn btn-success">Discover Recipes</Link>
                  </div>
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