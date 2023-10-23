import React, { useState, useEffect } from 'react';
import RecipeDetailsPage from './RecipeDetailsPage';
import { useNavigate } from 'react-router-dom';
import './RecipeFinder.css';

const RecipeFinder = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const apiKey = 'd3675ab5228c474b96751e48b2d785a2'; // Replace this with your actual API key
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const data = await response.json();
            if (data.results.length === 0) {
                setError('No results found');
            } else {
                setRecipes(data.results);
                setError(null);
            }
        } catch (error) {
            setError(error.message);
        }
    };
   

    const handleRecipeClick = (recipe) => {
        console.log("Selected Recipe before setting:", selectedRecipe);
        setSelectedRecipe(recipe);
        console.log("Selected Recipe after setting:", recipe);
        navigate(`/recipe/${recipe.id}`);
    };
    
    useEffect(() => {
        console.log(selectedRecipe);
    }, [selectedRecipe]);

    return (
        <div className="recipe-finder-container">
            <h1 className="header">Recipe Finder Application</h1>
            <p className='pheader'>Satisfy Your Cravings and Unleash Your Inner Chef Today</p>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-bar"
            />
            {error && (
                <div className="error-modal">
                    <div className="error-content">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>OK</button>
                    </div>
                </div>
            )}
            <button onClick={handleSearch} className="search-button">
                Search
            </button>

            <div className="recipe-container">
                {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
                        <h2>{recipe.title}</h2>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            style={{ cursor: 'pointer' }}
                            className="recipe-image"
                        />
                        <div>
  {recipe.servings && <p>Servings: {recipe.servings}</p>}
  {recipe.readyInMinutes && <p>Ready in: {recipe.readyInMinutes} minutes</p>}
</div>

                        
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-link">
                            Go to recipe
                        </a>
                    </div>
                ))}
            </div>
            {selectedRecipe && (
                <RecipeDetailsPage
                    recipe={selectedRecipe}
                    handleBack={() => setSelectedRecipe(null)}
                    className="recipe-details-page"
                />
            )}
        </div>
    );
};

export default RecipeFinder;
