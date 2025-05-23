// server/controllers/recipeController.js

const Recipe = require("../models/Recipe");
const User = require("../models/User");
const path = require("path");

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

    // Check if user is authenticated to determine if the recipe is saved
    let isSaved = false;
    if (req.user) {
      const user = await User.findOne({ auth0Id: req.user.id });
      if (user) {
        isSaved = user.savedRecipes.includes(recipe._id);
      }
    }

    // Send recipe info with saved status
    res.json({
      ...recipe.toObject(),
      isSaved
    });
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

    // Find user by Auth0 ID
    const user = await User.findOne({ auth0Id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found in database" });
    }

    // Create new recipe object
    const newRecipe = new Recipe({
      recipeName,
      description,
      cookingTime,
      calories,
      ingredients: JSON.parse(ingredients),
      instructions,
      userId: user._id, // Use MongoDB ObjectId from our database
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

    // Find user by Auth0 ID
    const user = await User.findOne({ auth0Id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found in database" });
    }

    // Check user owns the recipe
    if (recipe.userId.toString() !== user._id.toString()) {
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

    // Find user by Auth0 ID
    const user = await User.findOne({ auth0Id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found in database" });
    }

    // Check user owns the recipe
    if (recipe.userId.toString() !== user._id.toString()) {
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
    const recipes = await Recipe.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
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