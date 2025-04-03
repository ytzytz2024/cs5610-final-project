const axios = require('axios');

/**
 * Service to interact with Yelp API
 */
const yelpService = {
  /**
   * Search for restaurants in the area
   * @param {Object} options - Search options
   * @param {string} options.location - Location to search near
   * @param {number} options.latitude - Latitude coordinate
   * @param {number} options.longitude - Longitude coordinate
   * @param {number} options.limit - Number of results to return (max 50)
   * @param {number} options.offset - Offset the list of returned results by this amount
   * @param {string} options.term - Search term, e.g. "food", "restaurants"
   * @param {number} options.radius - Search radius in meters (max 40000)
   * @returns {Promise<Array>} - Promise containing search results
   */
  searchRestaurants: async (options = {}) => {
    try {
      const { 
        location, 
        latitude,
        longitude,
        limit = 4, 
        offset = 0,
        term = 'restaurants',
        radius = 10000,
        categories = 'restaurants'
      } = options;
      
      // Prepare params object - either use location OR coordinates
      const params = {
        term,
        limit,
        offset,
        radius,
        categories,
        sort_by: 'rating'
      };
      
      // If coordinates are provided, use them instead of location
      if (latitude && longitude) {
        params.latitude = latitude;
        params.longitude = longitude;
      } else if (location) {
        params.location = location;
      } else {
        // Default fallback location
        params.location = 'Vancouver, BC';
      }
      
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`
        },
        params
      });
      
      // Format the response data
      return response.data.businesses.map(business => ({
        id: business.id,
        name: business.name,
        image: business.image_url,
        url: business.url,
        price: business.price || '$',
        rating: business.rating,
        reviewCount: business.review_count,
        distance: Math.round(business.distance / 160.934), // Convert meters to minutes (roughly 1 mile = 2 minutes)
        categories: business.categories.map(cat => cat.title),
        coordinates: business.coordinates,
        address: business.location.display_address.join(', ')
      }));
    } catch (error) {
      console.error('Error fetching data from Yelp API:', error);
      if (error.response) {
        console.error('Yelp API error:', error.response.data);
      }
      throw new Error('Failed to fetch restaurant data from Yelp');
    }
  }
};

module.exports = yelpService;