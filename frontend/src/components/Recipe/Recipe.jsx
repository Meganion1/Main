import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import styles from "./Recipe.module.css";

function Recipe() {
    // Use the useLocation hook to access the location object
    const location = useLocation();
    const { recipes, selectedIngredients } = location.state || {}; // Extract state from location

    const [expandedSections, setExpandedSections] = useState({});

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

            {recipes && recipes.length > 0 ? (
                <div className={styles.recipeGrid}>
                    {recipes.map((recipe, index) => (
                        <div key={index} className={styles.recipeCard}>
                            <h2 className={styles.recipeTitle}>{recipe.title}</h2>

                            {recipe.image_base64 && (
                                <img
                                    src={`data:image/jpeg;base64,${recipe.image_base64}`}
                                    alt={recipe.title}
                                    className={styles.recipeImage}
                                />
                            )}

                            <div className={styles.recipeContent}>
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
                                    {recipe.ingredients && recipe.ingredients.length > 2 && (
                                        <button
                                            onClick={() => toggleSection(index, "ingredients")}
                                            className={styles.readMoreButton}
                                        >
                                            {expandedSections[index]?.ingredients ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>

                                <div className={styles.instructionsSection}>
                                    <h3>Instructions</h3>
                                    <div
                                        className={
                                            expandedSections[index]?.instructions
                                                ? styles.expandedText
                                                : styles.clampedText
                                        }
                                    >
                                        {recipe.instructions}
                                    </div>
                                    {recipe.instructions.length > 2 && (
                                        <button
                                            onClick={() => toggleSection(index, "instructions")}
                                            className={styles.readMoreButton}
                                        >
                                            {expandedSections[index]?.instructions
                                                ? "Read Less"
                                                : "Read More"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found. Please go back and select ingredients.</p>
            )}
        </div>
    );
}

export default Recipe;
