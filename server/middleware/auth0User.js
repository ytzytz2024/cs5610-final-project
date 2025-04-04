const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get Auth0 User ID from header
  const auth0UserId = req.headers['x-auth0-user-id'];
  
  if (!auth0UserId) {
    return res.status(401).json({ msg: 'No Auth0 User ID, authorization denied' });
  }
  
  try {
    // Find user by Auth0 ID
    let user = await User.findOne({ auth0Id: auth0UserId });
    
    // If no user exists but we have an Auth0 ID, create the user
    if (!user && auth0UserId) {
      // Create a minimal user record
      user = new User({
        auth0Id: auth0UserId,
        email: req.headers['x-auth0-email'] || 'user@example.com',
        username: req.headers['x-auth0-username'] || 'User'
      });
      
      await user.save();
    }
    
    // Add user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error('Error in auth middleware:', err);
    res.status(500).json({ msg: 'Server error in authentication' });
  }
};