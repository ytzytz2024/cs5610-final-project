// client/src/components/AuthRequiredRoute.jsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthRequiredRoute = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // If not logged in and not in the process of logging in, redirect to login
    if (!isLoading && !isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated, login, location]);
  
  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Verifying authentication...</p>
      </div>
    );
  }
  
  // Only render children if authenticated
  return isAuthenticated ? children : null;
};

export default AuthRequiredRoute;