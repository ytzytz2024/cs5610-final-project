import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipeDetail.css";

const RecipeDetail = ({ isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  // Check if current user is creator of recipe
  const isCreator = recipe?.userId === localStorage.getItem("userId");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setIsLoading(true);

      try {
        // For iteration 1, we'll use mock data
        // In the future this would be an actual API call

        // Simulating API delay
        setTimeout(() => {
          // Mock recipe data based on recipe ID
          let mockRecipe;

          if (id === "1") {
            mockRecipe = {
              _id: "1",
              recipeName: "Chicken and Rice Casserole with Tomatoes",
              description:
                "This comforting Chicken and Rice Casserole is a perfect family dinner option that combines tender shredded chicken with fluffy rice and fresh tomatoes. The dish is easy to prepare and results in a deliciously satisfying meal that's both nutritious and filling. The combination of protein-rich chicken and wholesome rice creates a balanced meal that's sure to become a family favorite.",
              cookingTime: 45,
              calories: 410,
              ingredients: [
                "2 cups cooked chicken, shredded",
                "1 cup white rice, uncooked",
                "1 cup diced tomatoes",
                "2 cups chicken broth",
                "1 onion, diced",
                "2 cloves garlic, minced",
                "1 tsp dried oregano",
                "1/2 tsp salt",
                "1/4 tsp black pepper",
                "1 cup shredded cheese",
              ],
              instructions:
                "1. Preheat oven to 375°F (190°C).\n2. In a large bowl, combine all ingredients.\n3. Transfer to a greased baking dish.\n4. Bake for 25-30 minutes until bubbly.\n5. Let stand for 5 minutes before serving.",
              userId: "123",
              image:
                "https://via.placeholder.com/600x400?text=Chicken+Rice+Casserole",
            };
          } else {
            // Default mock recipe if ID doesn't match
            mockRecipe = {
              _id: id,
              recipeName: "Sample Recipe",
              description:
                "This is a sample recipe description. In a real application, this would be loaded from the database.",
              cookingTime: 30,
              calories: 350,
              ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
              instructions:
                "1. Step one of the recipe.\n2. Step two of the recipe.\n3. Step three of the recipe.",
              userId: "456",
              image: "https://via.placeholder.com/600x400?text=Sample+Recipe",
            };
          }

          // Mock reviews
          const mockReviews = [
            {
              _id: "101",
              userId: "789",
              recipeId: id,
              comment:
                "This recipe is absolutely amazing! The combination of chicken and rice with the fresh tomatoes creates such a wonderful flavor profile. I've made it twice already and my family loves it. The instructions were clear and easy to follow.",
              timestamp: "2023-11-15T14:48:00.000Z",
              user: {
                username: "Isabella Thompson",
              },
            },
            {
              _id: "102",
              userId: "456",
              recipeId: id,
              comment:
                "A great weeknight dinner option! I added some extra vegetables and it turned out perfectly. The cooking time was spot on, and the casserole had just the right amount of moisture. Would definitely recommend trying this recipe.",
              timestamp: "2023-11-22T09:15:00.000Z",
              user: {
                username: "Michael Rodriguez",
              },
            },
          ];

          setRecipe(mockRecipe);
          setReviews(mockReviews);
          setIsLoading(false);
        }, 1000);

        // In future iterations, this would be:
        // const response = await axios.get(`/api/recipes/${id}`);
        // setRecipe(response.data);
        // const reviewsRes = await axios.get(`/api/reviews/recipe/${id}`);
        // setReviews(reviewsRes.data);
      } catch (err) {
        setError("Failed to load recipe details. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleSaveRecipe = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/recipe/${id}` } });
      return;
    }
    
    try {
      // This would be an actual API call in future iterations
      // await axios.post('/api/users/save-recipe', { recipeId: id });
      alert('Recipe saved successfully!');
    } catch (err) {
      console.error('Error saving recipe:', err);
      alert('Failed to save recipe. Please try again.');
    }
  };

  const handleDeleteRecipe = async () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      try {
        // This would be an actual API call in future iterations
        // await axios.delete(`/api/recipes/${id}`);
        alert('Recipe deleted successfully!');
        navigate('/');
      } catch (err) {
        console.error('Error deleting recipe:', err);
        alert('Failed to delete recipe. Please try again.');
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/recipe/${id}` } });
      return;
    }
    
    if (!reviewText.trim()) {
      return;
    }
    
    try {
      // This would be an actual API call in future iterations
      // const response = await axios.post('/api/reviews', {
      //   recipeId: id,
      //   comment: reviewText
      // });
      
      // For now, we'll just add the review to the state with mock data
      const newReview = {
        _id: Date.now().toString(),
        userId: localStorage.getItem('userId') || '999',
        recipeId: id,
        comment: reviewText,
        timestamp: new Date().toISOString(),
        user: {
          username: 'You' // In a real app, this would be the logged-in user's name
        }
      };
      
      setReviews([newReview, ...reviews]);
      setReviewText('');
      
      alert('Review added successfully!');
    } catch (err) {
      console.error('Error posting review:', err);
      alert('Failed to post review. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-5" role="alert">
        {error}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="alert alert-warning m-5" role="alert">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
        <h1 className="recipe-title">{recipe.recipeName}</h1>

        <div className="recipe-meta-info">
        <span className="time-info">
          <i className="bi bi-clock"></i> {recipe.cookingTime} mins
        </span>
        <span className="calorie-info">
          <i className="bi bi-lightning"></i> {recipe.calories} calories
        </span>
      </div>
    </div>
  );

};



export default RecipeDetail;
