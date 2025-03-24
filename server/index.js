const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

//load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set, using default secret. This is not secure for production!');
}

//Initialize Express application
const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Import all routes
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

//Register all routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

//Test route
app.get('/api', (req, res) => {
  res.json({ message: 'SmartRecipe API is running' });
});

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});