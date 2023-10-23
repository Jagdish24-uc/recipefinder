// RecipeDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetailsPage.css';

const RecipeDetailsPage = ({ handleBack }) => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                
                const apiKey = 'd3675ab5228c474b96751e48b2d785a2';
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.find((fav) => fav.id === id);
        setIsFavorite(!!isFav);
    }, [id]);

    const handleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            favorites = favorites.filter((fav) => fav.id !== id);
        } else {
            favorites.push({ ...recipe, isFavorite: true });
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const { title, image, readyInMinutes, servings, instructions, extendedIngredients, sourceUrl } = recipe;
    const cleanInstructions = (instructions) => {
        const lines = instructions.split('\n');
        const cleanedLines = lines.map((line) => line.replace(/<\/?ol>/g, '').replace(/<\/?li>/g, ''));
        return cleanedLines.join('\n');
      };
    return (
        <div className="recipe-details-container">
            <div> {title && <h2>{title}</h2>}
        {image && <img src={image} alt={title} className="recipe-image" />}</div>
       
        <p className="pinstruct">
  <h4>Instructions:</h4> 
  {instructions ? (
    <ol>
      {cleanInstructions(instructions).split('\n').map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ol>
  ) : (
    'Instructions not available.'
  )}
</p>
          <div className='pready'><h4>Ready in {readyInMinutes} minutes</h4>
        <h4>Servings: {servings}</h4><ul>
            <h4>ingredients</h4>
            {extendedIngredients &&
                extendedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                ))}
        </ul>
        </div>
        
        

        {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-link">
                Go to recipe
            </a>
        )}
        <button onClick={handleFavorite} className="favorite-button">
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
       
    </div>
    );
};

export default RecipeDetailsPage;
