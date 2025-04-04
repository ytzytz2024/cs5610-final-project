const yelpService = require('../services/yelpService');

// Get nearby restaurants
exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { location, latitude, longitude, limit, offset, term, radius } = req.query;
    
    // Create options object with all provided parameters
    const options = {
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : 0,
      term,
      radius: radius ? parseInt(radius) : undefined
    };
    
    // Add location or coordinates based on what's provided
    if (latitude && longitude) {
      options.latitude = parseFloat(latitude);
      options.longitude = parseFloat(longitude);
    } else if (location) {
      options.location = location;
    }
    
    const restaurants = await yelpService.searchRestaurants(options);
    
    res.json(restaurants);
  } catch (err) {
    console.error('Restaurant controller error:', err.message);
    res.status(500).json({ message: 'Server Error: Failed to fetch restaurants' });
  }
};