import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

export default function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

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
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/build">Build Your Own</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <Link className="nav-link" to="/profile">
                    <span className="user-icon">👤</span>
                    {user?.name}
                  </Link>
                  <button 
                    className="btn btn-link nav-link" 
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-link nav-link" 
                  onClick={() => loginWithRedirect()}
                >
                  <span className="user-icon">👤</span> Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
