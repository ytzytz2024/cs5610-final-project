# SmartRecipe (Iteration 1)

SmartRecipe is a responsive web application for recipe management built with the MERN stack (MongoDB, Express, React, Node.js). This repository contains the initial implementation (Iteration 1) of the application.
![image](https://github.com/user-attachments/assets/ba384424-178f-4303-8942-edb421f0c92f)


## Implemented Features

### Frontend
- 📱 **Responsive UI:** Adapts to desktop, tablet, and mobile screens
- 🏠 **Homepage:** Features a "What's in your kitchen?" component for ingredient input
- 🔍 **Search Interface:** Search page with sorting options (using mock data)
- 📝 **Recipe Creation Form:** Form for adding new recipes with validation
- 👤 **User Profiles:** Display of created and saved recipes with tabs
- 🍽️ **Recipe Detail View:** Detailed recipe view with ingredients, instructions, and reviews
- 🔐 **Authentication UI:** Login and registration pages

### Project Structure
- 📂 **Client-Server Architecture:** Separated frontend (React) and backend (Express) codebases
- 🛣️ **Routing:** Client-side routing with React Router
- 🧩 **Component Structure:** Reusable components like RecipeCard
- 🎨 **Styling:** CSS organization by component, responsive design with Bootstrap

### Development Setup
- ⚙️ **Build Configuration:** Vite for frontend, Node.js for backend
- 🔄 **Development Scripts:** Concurrent running of client and server
- 📊 **Project Configuration:** Package management, gitignore setup

## Tech Stack

### Frontend
- React 19.0.0
- React Router DOM 7.3.0
- Bootstrap 5.3.3
- Axios for API calls
- Vite as build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose (models defined)
- JWT structure for authentication
- Multer for file upload (structure only)

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (local or Atlas connection)

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

3. Create a `.env` file in the server directory with:
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

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

## Notes for Iteration 1

This is the first iteration of the SmartRecipe application focusing on UI implementation and project structure. Key points about the current state:

- UI components and pages are implemented with mock data
- Database models are defined but not fully connected
- Authentication is simulated with localStorage (not fully implemented)
- API routes are structured but minimally implemented

## Project Structure

```
SmartRecipe/
├── client/                 # React frontend
│   ├── src/                
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
├── server/                 # Node.js backend
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom middleware
│   ├── index.js            # Server entry point
└── package.json            # Root dependencies and scripts
```

## Team Contributions

### Xinghang Tong
- **Project Setup:**
  - Initialize project structure (including App.jsx, App.css, main.jsx, index.css)
  - Deploy the application on render.com
  - Server setup (server/index.js, server/db.js)
- **Recipe Management:**
  - Recipe Card component (RecipeCard.jsx, RecipeCard.css)
  - Comprehensive Recipe Detail page (RecipeDetail.jsx, RecipeDetail.css)
  - Complex Recipe Creation interface with validation (AddRecipe.jsx, AddRecipe.css)
- **UI Components:**
  - Main Navigation Bar (NavBar.jsx, NavBar.css)
  - Homepage (Home.jsx, Home.css)
- **Backend Structure:**
  - Recipe model (server/models/Recipe.js)
  - Recipe routes setup (server/routes/recipeRoutes.js)
  - Review model (server/models/Review.js)
  - Review routes setup (server/routes/reviewRoutes.js)
  
### Tianze Yin
- **Authentication System:**
  - Login page (Login.jsx)
  - Registration page (Register.jsx)
  - Authentication styling (Auth.css)
  - Authentication middleware (server/middleware/auth.js)
- **User Features:**
  - Profile page (Profile.jsx, Profile.css)
  - Search page (Search.jsx, Search.css)
  - Not Found page (NotFound.jsx, NotFound.css)
- **Backend Structure:**
  - User model (server/models/User.js)
  - User routes setup (server/routes/userRoutes.js)
  
*Note: All API routes are currently set up as empty route handlers, with the structure in place but no implementation details. These will be filled out in the next iteration to handle actual database operations.*

All features were developed in separate feature branches and merged to main after code review.

## Authors

- Xinghang Tong
- Tianze Yin