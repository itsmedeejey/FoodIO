import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AddRecipe.css";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { title, photo, description, ingredients, instructions, prepTime, cookTime };
    // Handle save logic here
    alert("Recipe saved successfully! 🎉");
    navigate('/'); // Navigate back to home page after saving
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="page-container">
      <div className="header">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <h1>Create New Recipe</h1>
      </div>

      <div className="content-container">
        <form onSubmit={handleSubmit} className="recipe-form">
          <label>Recipe Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Upload Photo:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {photo && <img src={photo} alt="Preview" className="image-preview" />}

          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Ingredients (comma separated):</label>
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />

          <label>Instructions:</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />

          <div className="time-inputs">
            <div>
              <label>Prep Time (mins):</label>
              <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} required />
            </div>
            <div>
              <label>Cook Time (mins):</label>
              <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="save-btn">Save Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
