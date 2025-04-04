const Recipe = require("../models/Recipe");
const path = require("path");
const User = require("../models/User");

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(500).send("Server Error");
  }
};

// Create a recipe
exports.createRecipe = async (req, res) => {
  try {
    const {
      recipeName,
      description,
      cookingTime,
      calories,
      ingredients,
      instructions,
    } = req.body;

    // Create new recipe object using the MongoDB user ID (from our middleware)
    const newRecipe = new Recipe({
      recipeName,
      description,
      cookingTime,
      calories,
      ingredients: JSON.parse(ingredients),
      instructions,
      userId: req.user._id, // Using MongoDB user ID from auth middleware
      image: req.file ? `/uploads/recipes/${req.file.filename}` : null,
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    // Check if user owns the recipe
    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const {
      recipeName,
      description,
      cookingTime,
      calories,
      ingredients,
      instructions,
    } = req.body;

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

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(500).send("Server Error");
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    // Check if user owns the recipe
    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Recipe.findByIdAndRemove(req.params.id);
    res.json({ msg: "Recipe removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    res.status(500).send("Server Error");
  }
};

// Get recipes by user ID
exports.getRecipesByUser = async (req, res) => {
  try {
    // Get Auth0 user ID from header
    const auth0UserId = req.headers['x-auth0-user-id'];
    
    if (!auth0UserId) {
      return res.status(400).json({ msg: "User ID is required" });
    }
    
    // Find the MongoDB user by Auth0 ID
    const user = await User.findOne({ auth0Id: auth0UserId });
    
    if (!user) {
      // If user doesn't exist in our DB yet, return empty array
      return res.json([]);
    }
    
    // Find recipes created by this user
    const recipes = await Recipe.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching user recipes:", err.message);
    res.status(500).send("Server Error");
  }
};

// Search recipes
exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ msg: "Search query is required" });
    }

    // Search in recipe name, description, or ingredients
    const recipes = await Recipe.find({
      $or: [
        { recipeName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { ingredients: { $in: [new RegExp(query, "i")] } },
      ],
    }).sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};