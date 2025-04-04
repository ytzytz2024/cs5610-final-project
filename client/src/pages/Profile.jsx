import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { RecipeService, UserService } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("created");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Get user's created recipes
      const createdResponse = await RecipeService.getRecipesByUser();
      setCreatedRecipes(createdResponse.data);

      // Get user's saved recipes
      const savedResponse = await UserService.getSavedRecipes();
      setSavedRecipes(savedResponse.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      await UserService.unsaveRecipe(recipeId);
      // Remove the unsaved recipe from the saved recipes list
      setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      console.error("Error unsaving recipe:", err);
      alert("Failed to unsave recipe. Please try again.");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center my-5">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.picture ? (
              <img 
                src={user.picture} 
                alt={user.name} 
                className="rounded-circle" 
                width="80" 
                height="80"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div 
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px", fontSize: "2rem" }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="recipes-section">
        <div className="recipes-tabs">
          <button
            className={`tab-btn ${activeTab === "created" ? "active" : ""}`}
            onClick={() => setActiveTab("created")}
          >
            My Created Recipes
          </button>
          <button
            className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            My Saved Recipes
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "created" ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">My Created Recipes</h2>
                <Link to="/build" className="btn btn-success">
                  <i className="bi bi-plus-lg"></i> Create New Recipe
                </Link>
              </div>

              {createdRecipes.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't created any recipes yet.</p>
                  <Link to="/build" className="btn btn-success">
                    Create Your First Recipe
                  </Link>
                </div>
              ) : (
                <div className="row">
                  {createdRecipes.map((recipe) => (
                    <div className="col-md-4 mb-4" key={recipe._id}>
                      <RecipeCard recipe={recipe} showSaveButton={false} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">My Saved Recipes</h2>
              </div>

              {savedRecipes.length === 0 ? (
                <div className="empty-state">
                  <p>You haven't saved any recipes yet.</p>
                  <Link to="/search" className="btn btn-success">
                    Discover Recipes
                  </Link>
                </div>
              ) : (
                <div className="row">
                  {savedRecipes.map((recipe) => (
                    <div className="col-md-4 mb-4" key={recipe._id}>
                      <RecipeCard
                        recipe={recipe}
                        showSaveButton={false}
                        onUnsave={handleUnsaveRecipe}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
