import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserService } from './services/api';

// Components
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// App-wide styles
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Check if user is logged in on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify the token with the backend
          await UserService.getProfile();
          setIsLoggedIn(true);
        } catch (error) {
          // Token invalid, clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          console.error('Authentication error:', error);
        } finally {
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };
    
    verifyToken();
  }, []);
  
  if (isCheckingAuth) {
    // Show loading indicator while checking authentication
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="app-container">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<RecipeDetail isLoggedIn={isLoggedIn} />} />
            <Route path="/build" element={<AddRecipe isLoggedIn={isLoggedIn} />} />
            <Route path="/recipe/edit/:id" element={<AddRecipe isLoggedIn={isLoggedIn} isEditing={true} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} SmartRecipe - Created by Tianze Yin & Xinghang Tong</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;