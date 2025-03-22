import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    // Clear any authentication tokens
    localStorage.removeItem("token");
    // Update auth state
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-text">🍴 SmartRecipe</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        
      </div>
    </nav>
  );
};
