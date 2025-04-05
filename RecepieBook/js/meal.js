const mealDetailsContainer = document.getElementById("meal-details");

// Get meal ID from URL
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("id");

async function fetchMealDetails() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        displayMealDetails(data.meals[0]);
    } catch (error) {
        mealDetailsContainer.innerHTML = "<p>Error loading meal details.</p>";
    }
}

function displayMealDetails(meal) {
    mealDetailsContainer.innerHTML = `
        <div>
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="meal-desc"><p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        <div>
    `;
}

function goBack() {
    window.history.back();
}

// Fetch meal details on page load
fetchMealDetails();
