const appId = 'f0274b46';
const appKey = 'ebccb7e2c7dd3128a44a776e7cff090b';
const ingredientList = [];

document.getElementById('add-ingredient').addEventListener('click', addIngredient);

// Get the input field and add an event listener for the "Enter" key
const ingredientInput = document.getElementById('ingredient');
ingredientInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addIngredient();
    }
});

document.getElementById('search-recipes').addEventListener('click', () => {
    if (ingredientList.length > 0) {
        searchRecipes();
    }
});

function addIngredient() {
    const ingredientValue = ingredientInput.value.trim();
    if (ingredientValue) {
        ingredientList.push(ingredientValue);
        ingredientInput.value = '';
        renderIngredientList();
    }
}

function renderIngredientList() {
    const ingredientListElement = document.getElementById('ingredient-list');
    ingredientListElement.innerHTML = '';
    ingredientList.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.textContent = ingredient;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button'); // Add the delete-button class
        deleteButton.addEventListener('click', () => {
            deleteIngredient(index);
        });

        li.appendChild(deleteButton);
        ingredientListElement.appendChild(li);
    });
}

function deleteIngredient(index) {
    ingredientList.splice(index, 1);
    renderIngredientList();
}

function searchRecipes() {
    const query = ingredientList.join(',');
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data.hits);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipe-results');
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipe.recipe.label;

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.recipe.image;

        const recipeIngredients = document.createElement('ul');
        recipe.recipe.ingredientLines.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            recipeIngredients.appendChild(li);
        });

        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeIngredients);

        recipeResults.appendChild(recipeCard);
    });
}

// Add the event listener for the "Home" button
const home = document.getElementById('home');
home.addEventListener('click', () => {
    // Navigate to the main page (index.html)
    window.location.href = 'index.html';
});