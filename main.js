// getElementById

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// all button add
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe); 

// close button add
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// add mealList
function getMealList() {
  let searchInputTxt = document.getElementById('search-input').value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      let html = "";

      // when find meal
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">

              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
              </div>
              
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Recipes</a>
              </div> 

            </div>
          `;
        });
        mealList.classList.remove('notFound');

        // when didnot find meal
      } else {
        html = "Sorry, we didn't find the meal!";
        mealList.classList.add('notFound');
      }
      mealList.innerHTML = html;
    });
}

// show recipe section
function getMealRecipe(recipe) {
  recipe.preventDefault();
  if (recipe.target.classList.contains('recipe-btn')) {
    let mealItem = recipe.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>

    <p class="recipe-category">${meal.strCategory}</p>

    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>

    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
    </div>

    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}