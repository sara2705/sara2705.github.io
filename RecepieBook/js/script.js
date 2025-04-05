const mealContainer = document.getElementById("meal-container");
const searchInput = document.getElementById("search");
const categoryContainer = document.getElementById("category-container");

async function loadCategories() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        categoryContainer.innerHTML = "<p>Error loading categories.</p>";
    }
}

function displayCategories(categories) {
    categoryContainer.innerHTML = categories.map(cat => `
        <button onclick="filterByCategory('${cat.strCategory}')">${cat.strCategory}</button>
    `).join(" ");
}

// Search meals by name
async function searchMeal() {
    const query = searchInput.value.trim();
    if (!query) return;
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
}

// Fetch random meal
async function getRandomMeal() {
    fetchMeals("https://www.themealdb.com/api/json/v1/1/random.php");
}

// Filter meals by category
async function filterByCategory(category) {
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
}

// Fetch meals and display them
async function fetchMeals(url) {
    mealContainer.innerHTML = "<p>Loading...</p>";
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        mealContainer.innerHTML = "<p>Something went wrong! Try again.</p>";
    }
}

function displayMeals(meals) {
    if (!meals) {
        mealContainer.innerHTML = "<p>No meals found!</p>";
        return;
    }

    mealContainer.innerHTML = meals.map(meal => `
        <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button onclick="viewMeal('${meal.idMeal}')">View Recipe</button>
        </div>
    `).join("");
}

function viewMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}

loadCategories();
