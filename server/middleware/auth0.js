// server/middleware/auth0.js

const { auth } = require('express-oauth2-jwt-bearer');
const User = require('../models/User');

// Configure Auth0 middleware - validates the Access Token
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://api.smartrecipe.com',
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN || 'your-auth0-domain.auth0.com'}`
});

// Middleware to verify token and load user
const verifyUser = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const auth0Id = req.auth.payload.sub;
    
    // Find or create the user in our database
    let user = await User.findOne({ auth0Id });
    
    if (!user && req.auth.payload.email) {
      // Create a new user in our database
      user = new User({
        auth0Id,
        email: req.auth.payload.email,
        username: req.auth.payload.email.split('@')[0], // Default username from email
        picture: req.auth.payload.picture || null
      });
      
      await user.save();
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add user info to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional middleware to get user if available, but proceed anyway
const optionalAuth = async (req, res, next) => {
  try {
    if (req.auth && req.auth.payload) {
      const auth0Id = req.auth.payload.sub;
      const user = await User.findOne({ auth0Id });
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (err) {
    // If authentication fails, just continue without user
    next();
  }
};

module.exports = { checkJwt, verifyUser, optionalAuth };