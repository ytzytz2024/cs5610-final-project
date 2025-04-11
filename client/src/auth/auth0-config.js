// client/src/auth/auth0-config.js

export const AUTH0_CONFIG = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirectUri: window.location.origin,
    scope: "openid profile email"
  };
  
  // Note: You'll need to add these environment variables to your .env file 
  // or replace placeholders with actual values