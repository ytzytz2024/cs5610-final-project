import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useAuth0UserStorage = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const storeUserInfo = async () => {
      if (isAuthenticated && user) {
        // Store user ID for API calls
        localStorage.setItem('auth0UserId', user.sub);
        
        try {
          // Get token for any API calls that might need it
          const token = await getAccessTokenSilently();
          localStorage.setItem('auth0Token', token);
        } catch (error) {
          console.error('Error getting access token:', error);
        }
      } else {
        // Clear user info if not authenticated
        localStorage.removeItem('auth0UserId');
        localStorage.removeItem('auth0Token');
      }
    };

    storeUserInfo();
  }, [isAuthenticated, user, getAccessTokenSilently]);
};