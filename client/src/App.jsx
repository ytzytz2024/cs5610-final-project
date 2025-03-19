import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// 页面组件会在后期添加
// import Home from './pages/Home';
// import Search from './pages/Search';
// import RecipeDetails from './pages/RecipeDetails';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>SmartRecipe</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/search">Search</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/search" element={<h2>Search Page</h2>} />
            <Route path="/recipe/:id" element={<h2>Recipe Details</h2>} />
            <Route path="/profile" element={<h2>Profile Page</h2>} />
            <Route path="/login" element={<h2>Login Page</h2>} />
            <Route path="/register" element={<h2>Register Page</h2>} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 SmartRecipe - Xinghang Tong, Tianze Yin</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;