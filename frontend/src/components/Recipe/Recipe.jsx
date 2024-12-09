import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Recipe.module.css";

function Recipe() {
    const location = useLocation();
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [expandedSections, setExpandedSections] = useState({});

    const selectedIngredients = location.state?.selectedIngredients || [];

    useEffect(() => {
        if (location.state && location.state.recipes) {
            const filtered = location.state.recipes.filter((recipe) => {
                // Only show recipes that contain at least one of the selected ingredients
                return selectedIngredients.every((ingredient) =>
                    recipe.ingredients.toLowerCase().includes(ingredient.name.toLowerCase())
                );
            });

            setFilteredRecipes(filtered); // Update the filtered recipes list
        }
    }, [location.state, selectedIngredients]);

    const toggleSection = (recipeIndex, sectionType) => {
        setExpandedSections((prev) => ({
            ...prev,
            [recipeIndex]: {
                ...prev[recipeIndex],
                [sectionType]: !prev[recipeIndex]?.[sectionType],
            },
        }));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recommended Recipes</h1>

            {filteredRecipes.length === 0 ? (
                <p className={styles.noRecipes}>No recipes found for selected ingredients.</p>
            ) : (
                <div className={styles.recipeGrid}>
                    {filteredRecipes.map((recipe, index) => (
                        <div key={index} className={styles.recipeCard}>
                            <h2 className={styles.recipeTitle}>{recipe.title}</h2>

                            {/* Display image if available */}
                            {recipe.image_base64 && (
                                <img
                                    src={`data:image/jpeg;base64,${recipe.image_base64}`}
                                    alt={recipe.title}
                                    className={styles.recipeImage}
                                />
                            )}

                            <div className={styles.recipeContent}>
                                {/* Ingredients Section */}
                                <div className={styles.ingredientsSection}>
                                    <h3>Ingredients</h3>
                                    <div
                                        className={
                                            expandedSections[index]?.ingredients
                                                ? styles.expandedText
                                                : styles.clampedText
                                        }
                                    >
                                        {Array.isArray(recipe.ingredients)
                                            ? recipe.ingredients.join(", ")
                                            : recipe.ingredients}
                                    </div>
                                    {recipe.ingredients.length > 2 && (
                                        <button
                                            onClick={() => toggleSection(index, "ingredients")}
                                            className={styles.readMoreButton}
                                        >
                                            {expandedSections[index]?.ingredients ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>

                                {/* Instructions Section */}
                                <div className={styles.instructionsSection}>
                                    <h3>Instructions</h3>
                                    <div
                                        className={
                                            expandedSections[index]?.instructions
                                                ? styles.expandedText
                                                : styles.clampedText
                                        }
                                    >
                                        {Array.isArray(recipe.instructions)
                                            ? recipe.instructions.join(". ")
                                            : recipe.instructions}
                                    </div>
                                    {recipe.instructions.length > 2 && (
                                        <button
                                            onClick={() => toggleSection(index, "instructions")}
                                            className={styles.readMoreButton}
                                        >
                                            {expandedSections[index]?.instructions ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Recipe;
