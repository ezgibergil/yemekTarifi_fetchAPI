document.getElementById('randomRecipeButton').addEventListener('click', async () => {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = ''; 

    try {
        
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();

        
        const meal = data.meals[0];

        
        const recipeTitle = meal.strMeal;
        const recipeImage = meal.strMealThumb;
        const recipeInstructions = meal.strInstructions;

        
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${ingredient} (${measure})`);
            }
        }

        
        const recipeHTML = `
            <div class="recipe-title">${recipeTitle}</div>
            <img src="${recipeImage}" alt="${recipeTitle}" width="200">
            <div class="recipe-ingredients">
                <h3>Malzemeler:</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li class="ingredient-item">${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-instructions">
                <h3>Yapılışı:</h3>
                <p>${recipeInstructions}</p>
            </div>
        `;

        
        recipeContainer.innerHTML = recipeHTML;

    } catch (error) {
        
        recipeContainer.innerHTML = '<p>Tarif alınırken bir hata oluştu.</p>';
    }
});
