const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/recipes/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG and PNG files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: fileFilter
});

// @route   GET /api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/recipes
// @desc    Create a recipe
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { recipeName, description, cookingTime, calories, ingredients, instructions } = req.body;
    
    // Create new recipe object
    const newRecipe = new Recipe({
      recipeName,
      description,
      cookingTime,
      calories,
      ingredients: JSON.parse(ingredients),
      instructions,
      userId: req.user.id,
      image: req.file ? `/uploads/recipes/${req.file.filename}` : null
    });
    
    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    // Check user owns the recipe
    if (recipe.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    const { recipeName, description, cookingTime, calories, ingredients, instructions } = req.body;
    
    // Build recipe object
    const recipeFields = {};
    if (recipeName) recipeFields.recipeName = recipeName;
    if (description) recipeFields.description = description;
    if (cookingTime) recipeFields.cookingTime = cookingTime;
    if (calories) recipeFields.calories = calories;
    if (ingredients) recipeFields.ingredients = JSON.parse(ingredients);
    if (instructions) recipeFields.instructions = instructions;
    if (req.file) recipeFields.image = `/uploads/recipes/${req.file.filename}`;
    
    // Update recipe
    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );
    
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;