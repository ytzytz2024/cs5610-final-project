# SmartRecipe

SmartRecipe is a responsive web application that helps users create, discover, and save recipes. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a user-friendly interface for recipe management and discovery.

## Features

- 🔐 **User Authentication**: Register and login securely
- 📝 **Recipe Management**: Create, read, update, and delete your own recipes
- 🔍 **Recipe Discovery**: Search for recipes by name, description, or ingredients
- 💾 **Save Recipes**: Bookmark recipes from other users for later
- ⭐ **Reviews & Comments**: Leave feedback on recipes you've tried
- 👤 **User Profiles**: Manage your created and saved recipes

## Technologies Used

### Frontend
- React 19.0.0
- React Router DOM 7.3.0
- Bootstrap 5.3.3 & Bootstrap Icons
- Axios for API communication
- Vite as the build tool

### Backend
- Node.js with Express.js framework
- MongoDB with Mongoose for database operations
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password encryption
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/SmartRecipe.git
cd SmartRecipe
```

2. Install dependencies for both server and client
```
npm run install-all
```

3. Create a `default.json` file in the `server/config` directory with the following content:
```json
{
  "mongoURI": "your_mongodb_connection_string",
  "jwtSecret": "your_jwt_secret"
}
```

4. Create a `.env` file in the server directory with:
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
```

5. Create an `uploads/recipes` directory in the server root for recipe image uploads

### Running the Application

To run both the server and client concurrently in development mode:
```
npm run dev
```

To run only the server:
```
npm run server
```

To run only the client:
```
npm run client
```

## Project Structure

```
SmartRecipe/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   └── package.json        # Client dependencies
├── server/                 # Node.js backend
│   ├── models/             # MongoDB data models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── index.js            # Server entry point
│   └── package.json        # Server dependencies
└── package.json            # Root dependencies and scripts
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `POST /api/users/save-recipe` - Save a recipe (protected)
- `GET /api/users/saved-recipes` - Get saved recipes (protected)
- `DELETE /api/users/unsave-recipe/:id` - Unsave a recipe (protected)

### Recipe Routes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get a recipe by ID
- `POST /api/recipes` - Create a recipe (protected)
- `PUT /api/recipes/:id` - Update a recipe (protected)
- `DELETE /api/recipes/:id` - Delete a recipe (protected)
- `GET /api/recipes/user/:userId` - Get recipes by user
- `GET /api/recipes/search` - Search recipes

### Review Routes
- `POST /api/reviews` - Create a review (protected)
- `GET /api/reviews/recipe/:recipeId` - Get reviews for a recipe
- `PUT /api/reviews/:id` - Update a review (protected)
- `DELETE /api/reviews/:id` - Delete a review (protected)

## License

This project is licensed under the ISC License

## Acknowledgments

- This project was created as the final project for a web development course
- Authors: Tianze Yin & Xinghang Tong