// client/src/hooks/useAuth.js

import { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserService } from '../services/api';

export const useAuth = () => {
  const { 
    isAuthenticated, 
    isLoading: isAuth0Loading, 
    user,
    getAccessTokenSilently,
    loginWithRedirect, 
    logout 
  } = useAuth0();
  
  const [dbUser, setDbUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  
  // Function to get token - this will be passed to API calls
  const getToken = useCallback(async () => {
    try {
      return await getAccessTokenSilently();
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  }, [getAccessTokenSilently]);
  
  // Fetch the user profile from our database when user is authenticated
  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          setIsLoadingUser(true);
          const response = await UserService.getProfile(getToken);
          setDbUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setIsLoadingUser(false);
        }
      } else if (!isAuth0Loading && !isAuthenticated) {
        setDbUser(null);
        setIsLoadingUser(false);
      }
    };
    
    fetchUser();
  }, [isAuthenticated, user, isAuth0Loading, getToken]);
  
  // Custom login function that redirects back to the current page
  const login = () => {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname }
    });
  };
  
  // Custom logout function that redirects to home page
  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };
  
  return {
    isAuthenticated,
    isLoading: isAuth0Loading || isLoadingUser,
    user: dbUser, // Our database user
    authUser: user, // Auth0 user object
    getToken, // Function to get access token
    login,
    logout: handleLogout
  };
};