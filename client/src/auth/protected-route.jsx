// client/src/auth/protected-route.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    // If user is not authenticated and not in loading state, redirect to Auth0 login
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  // Show loading while checking authentication status
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If authenticated, show the protected content
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;