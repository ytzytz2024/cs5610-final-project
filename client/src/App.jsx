import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/build" element={<AddRecipe />} />
            <Route path="/recipe/edit/:id" element={<AddRecipe isEditing={true} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
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