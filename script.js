const btn_search = document.getElementById("btn-search");
const meal_proposed = document.getElementById("meal-proposed");
const details = document.getElementById("details");
const details_close = document.getElementById("details-close");


btn_search.addEventListener("click", getMealList);
meal_proposed.addEventListener('click', getMealDetails);
details_close.addEventListener('click', ()=>{
    details.classList.remove('display');
});

// get the list of meals
function getMealList() {
    const search_txt = document.getElementById("search-txt").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_txt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img"> 
                            <img src="${meal.strMealThumb}"/>
                        </div>
                        <div class="meal-details">
                            <h3>${meal.strMeal}</h3>
                            <button class="btn">Get Recipe</button>
                        </div>
                    </div>
                    `;
                });
                meal_proposed.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                meal_proposed.classList.add("notfound");
            }

            meal_proposed.innerHTML = html;
        });
}

function getMealDetails(e) {
    if (e.target.classList.contains('btn')) {
        let mealItems = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipe(data.meals));
    }
}

function mealRecipe(meal) {
    console.log(meal);
    meal = meal[0];
    // create a new div element to hold recipe details
    let html = `
            <button id="details-close" ><i class="fas fa-times"></i></button>
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
            <div class="Instructions">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-img">
                <img src="${meal.strMealThumb}" />
            </div>
            <div class="recipe-vedio">
                <a href="${meal.strYoutube}" target="_blank">Recipe Video</a>
            </div>

    `;
    details.innerHTML = html;
    details.classList.add('display');
}
