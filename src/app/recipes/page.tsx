"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecipes } from "@/services/recipeService";
import { IRecipe } from "@/services/recipeService";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [search, setSearch] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 5;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(search.toLowerCase()) &&
        (tagFilter ? recipe.tags.includes(tagFilter) : true)
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>Recipes</h1>
            <input
                type="text"
                placeholder="Search recipes"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />
            <div>
                <label>Filter by tag:</label>
                <select onChange={(e) => setTagFilter(e.target.value)} value={tagFilter}>
                    <option value="">All tags</option>
                    <option value="dessert">Dessert</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                </select>
            </div>
            <ul>
                {currentRecipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link> - {recipe.tags.join(", ")}
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;