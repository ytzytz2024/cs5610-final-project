import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { useAuth0UserStorage } from './hooks/useAuth0UserStorage';
import ProtectedRoute from './auth/protected-route';
import { useAuth0 } from "@auth0/auth0-react";

// Import your components here
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Search from './pages/Search';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// App-wide styles
import './App.css';

function AppContent() {
  // Use the hook to store Auth0 user info in localStorage
  useAuth0UserStorage();
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <NavBar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/build" element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          } />
          <Route path="/recipe/edit/:id" element={
            <ProtectedRoute>
              <AddRecipe isEditing={true} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} SmartRecipe - Created by Tianze Yin & Xinghang Tong</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <AppContent />
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;