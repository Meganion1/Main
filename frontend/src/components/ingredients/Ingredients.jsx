import React, { useState } from "react";
import styles from "./Ingredients.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ingredients() {
  const ingredients = [
    { id: 1521, name: "Lemon" },
    { id: 1522, name: "Chicken" },
    { id: 1523, name: "Eggs" },
    { id: 1527, name: "Milk" },
    { id: 1528, name: "Bacon" },
    { id: 1530, name: "Pork" },
    { id: 1534, name: "Avocado" },
    { id: 1536, name: "Fish" },
  ];

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // Image state
  const [isDetecting, setIsDetecting] = useState(false); // Detection state
  const [detectedRecipe, setDetectedRecipe] = useState(null); // Detected recipe state
  const navigate = useNavigate();

  const handleFindRecipesClick = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ingredientNames = selectedIngredients.map((item) => item.name);
      const queryString = ingredientNames.join(",");

      const response = await axios.get(`http://127.0.0.1:8000/api/recommend-recipes/`, {
        params: { ingredients: queryString },
      });

      if (response.data && response.data.recommendations.length > 0) {
        const recommendations = response.data.recommendations.slice(0, 5);
        navigate("/recipe", { state: { recipes: recommendations, selectedIngredients } });
      } else {
        setError("No recipes found.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("An error occurred while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Set image as a preview
        detectRecipe(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectRecipe = (imageData) => {
    setIsDetecting(true);
    setDetectedRecipe(null);

    // Simulating recipe detection (mock)
    setTimeout(() => {
      setIsDetecting(false);
      setDetectedRecipe("Spaghetti Bolognese"); // Mock recipe
    }, 2000);
  };

  const handleIngredientSelect = (ingredient) => {
    const isSelected = selectedIngredients.some(
      (selected) => selected.id === ingredient.id
    );

    if (isSelected) {
      setSelectedIngredients(
        selectedIngredients.filter((selected) => selected.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`col-md-3 ${styles.customColumn} ${styles.first}`}>
          <div className={styles.left_wrapper0}>
            <div className={styles.i_tile}>
              <span className={styles.text}>WHAT DO YOU HAVE?</span>
              <div className={styles.k_container}>
                <p className={styles.k_button}>Available Ingredients</p>
              </div>
            </div>
            <div className={styles.left_wrapper}>
              <div
                className={styles.tile_wrapper_tiles}
                style={{ position: "relative", overflow: "hidden" }}
              >
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className={styles.i_list}>
                    <span className={styles.check_box}>
                      <input
                        type="checkbox"
                        checked={selectedIngredients.some(
                          (selected) => selected.id === ingredient.id
                        )}
                        onChange={() => handleIngredientSelect(ingredient)}
                        className={styles.ingredient_check}
                      />
                      <span className={styles.ingredient_checkbox}></span>
                      <span className={styles.ingredient_checkbox_label}>
                        {ingredient.name}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`col-md-3 ${styles.customColumn} ${styles.second}`}>
          <div className={styles.checked_ingredients}>
            <p className={styles.checked_ingredients_title}>Your Ingredients</p>
            {selectedIngredients.length === 0 ? (
              <div className={styles.Empty}>
                <p>You don't have any selected ingredients.</p>
              </div>
            ) : (
              <div className={styles.List}>
                {selectedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className={styles.list_item}>
                    {ingredient.name}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.selectedNames}>
              {selectedIngredients.length > 0 && (
                <>
                  <h4>Selected Ingredient Names:</h4>
                  <div style={{ flexDirection: "column" }}>
                    {selectedIngredients
                      .map((ingredient) =>
                        <p>{ingredient.name}</p>
                      )
                    }
                  </div>
                </>
              )}
            </div>
            <div className={styles.button_submit}>
              <button onClick={handleFindRecipesClick} className={styles.button}>
                Find Recipes
              </button>
              <button onClick={() => setSelectedIngredients([])} className={styles.button}>
                Clear All
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>

        <div className={`col-md-3 ${styles.customColumn} ${styles.third}`}>
          <div className={styles.card}>
            <h1 className={styles.title}>Food Recipe Detection</h1>
            <div className={styles.uploadArea}>
              <label htmlFor="upload" className={styles.uploadLabel}>
                Click here to upload an image of food
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.uploadInput}
              />
            </div>
            {image && (
              <img src={image} alt="Uploaded food" className={styles.previewImage} />
            )}
            {isDetecting && (
              <div className={styles.detectionResult}>
                <div className={styles.loadingSpinner}></div>
                <p>Detecting recipe...</p>
              </div>
            )}
            {detectedRecipe && (
              <div className={styles.detectionResult}>
                <p>Recipe: {detectedRecipe}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
