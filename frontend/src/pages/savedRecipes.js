import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="saved-recipes">
      <h2>My Saved Recipes</h2>
      <div className="recipes-grid">
        {savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
