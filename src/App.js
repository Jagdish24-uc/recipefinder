// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeFinder from './RecipeFinder';
import RecipeDetailsPage from './RecipeDetailsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipeFinder />} />
                <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
