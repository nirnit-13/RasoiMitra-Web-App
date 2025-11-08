const API_BASE = 'http://localhost:3000/api';
const loader = document.getElementById('loader');
const recipeDetails = document.getElementById('recipe-details');
const errorMessage = document.getElementById('error-message');
const recipeNameNav = document.getElementById('recipe-name-nav');
const likeBtn = document.getElementById('like-btn');
const heartIcon = document.getElementById('heart-icon');

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

let isLiked = false;
let currentRecipe = null;

async function checkIfLiked() {
  try {
    const response = await fetch(`${API_BASE}/liked`);
    if (response.ok) {
      const likedRecipes = await response.json();
      isLiked = likedRecipes.some(r => r.id == recipeId);
      updateLikeButton();
    }
  } catch (error) {
    console.error('Error checking liked status:', error);
  }
}

function updateLikeButton() {
  if (isLiked) {
    heartIcon.textContent = '❤️';
    likeBtn.classList.add('liked');
  } else {
    heartIcon.textContent = '🤍';
    likeBtn.classList.remove('liked');
  }
}

likeBtn.addEventListener('click', async () => {
  try {
    if (isLiked) {
      const response = await fetch(`${API_BASE}/liked/${recipeId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        isLiked = false;
        updateLikeButton();
      }
    } else {
      const response = await fetch(`${API_BASE}/liked/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentRecipe)
      });
      
      if (response.ok) {
        isLiked = true;
        updateLikeButton();
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
});

async function loadRecipeDetails() {
  if (!recipeId) {
    errorMessage.style.display = 'block';
    return;
  }
  
  try {
    loader.style.display = 'block';
    
    const response = await fetch(`${API_BASE}/recipe/${recipeId}`);
    if (!response.ok) throw new Error('Failed to fetch recipe');
    
    const recipe = await response.json();
    currentRecipe = recipe;
    loader.style.display = 'none';
    recipeDetails.style.display = 'block';
    
    displayRecipe(recipe);
    await checkIfLiked();
  } catch (error) {
    loader.style.display = 'none';
    errorMessage.style.display = 'block';
    console.error('Error loading recipe:', error);
  }
}

function displayRecipe(recipe) {
  recipeNameNav.textContent = recipe.title;
  
  const imageUrl = recipe.image || 'https://via.placeholder.com/800x400?text=No+Image';
  document.getElementById('recipe-image').src = imageUrl;
  document.getElementById('recipe-image').alt = recipe.title;
  
  document.getElementById('recipe-title').textContent = recipe.title;
  
  const readyInMinutes = recipe.readyInMinutes || 'N/A';
  const servings = recipe.servings || 'N/A';
  const cuisine = recipe.cuisines && recipe.cuisines.length > 0 ? recipe.cuisines.join(', ') : 'Various';
  
  document.getElementById('prep-time').innerHTML = `⏱️ Ready in: ${readyInMinutes} min`;
  document.getElementById('servings').innerHTML = `👨‍🍳 Servings: ${servings}`;
  document.getElementById('cuisine').innerHTML = `🍽️ ${cuisine}`;
  
  if (recipe.nutrition) {
    document.getElementById('calories').textContent = 
      recipe.nutrition.calories ? Math.round(recipe.nutrition.calories) : '0';
    document.getElementById('protein').textContent = 
      recipe.nutrition.protein ? `${Math.round(recipe.nutrition.protein)}g` : '0g';
    document.getElementById('carbs').textContent = 
      recipe.nutrition.carbs ? `${Math.round(recipe.nutrition.carbs)}g` : '0g';
    document.getElementById('fat').textContent = 
      recipe.nutrition.fat ? `${Math.round(recipe.nutrition.fat)}g` : '0g';
    document.getElementById('fiber').textContent = 
      recipe.nutrition.fiber ? `${Math.round(recipe.nutrition.fiber)}g` : '0g';
    document.getElementById('sugar').textContent = 
      recipe.nutrition.sugar ? `${Math.round(recipe.nutrition.sugar)}g` : '0g';
    document.getElementById('sodium').textContent = 
      recipe.nutrition.sodium ? `${Math.round(recipe.nutrition.sodium)}mg` : '0mg';
    document.getElementById('cholesterol').textContent = 
      recipe.nutrition.cholesterol ? `${Math.round(recipe.nutrition.cholesterol)}mg` : '0mg';
    document.getElementById('saturatedFat').textContent = 
      recipe.nutrition.saturatedFat ? `${Math.round(recipe.nutrition.saturatedFat)}g` : '0g';
    document.getElementById('potassium').textContent = 
      recipe.nutrition.potassium ? `${Math.round(recipe.nutrition.potassium)}mg` : '0mg';
    document.getElementById('vitaminA').textContent = 
      recipe.nutrition.vitaminA ? `${Math.round(recipe.nutrition.vitaminA)}IU` : '0IU';
    document.getElementById('vitaminC').textContent = 
      recipe.nutrition.vitaminC ? `${Math.round(recipe.nutrition.vitaminC)}mg` : '0mg';
    document.getElementById('vitaminB6').textContent = 
      recipe.nutrition.vitaminB6 ? `${Math.round(recipe.nutrition.vitaminB6)}mg` : '0mg';
    document.getElementById('calcium').textContent = 
      recipe.nutrition.calcium ? `${Math.round(recipe.nutrition.calcium)}mg` : '0mg';
    document.getElementById('iron').textContent = 
      recipe.nutrition.iron ? `${Math.round(recipe.nutrition.iron)}mg` : '0mg';
    document.getElementById('magnesium').textContent = 
      recipe.nutrition.magnesium ? `${Math.round(recipe.nutrition.magnesium)}mg` : '0mg';
  } else {
    document.getElementById('calories').textContent = '0';
    document.getElementById('protein').textContent = '0g';
    document.getElementById('carbs').textContent = '0g';
    document.getElementById('fat').textContent = '0g';
    document.getElementById('fiber').textContent = '0g';
    document.getElementById('sugar').textContent = '0g';
    document.getElementById('sodium').textContent = '0mg';
    document.getElementById('cholesterol').textContent = '0mg';
    document.getElementById('saturatedFat').textContent = '0g';
    document.getElementById('potassium').textContent = '0mg';
    document.getElementById('vitaminA').textContent = '0IU';
    document.getElementById('vitaminC').textContent = '0mg';
    document.getElementById('vitaminB6').textContent = '0mg';
    document.getElementById('calcium').textContent = '0mg';
    document.getElementById('iron').textContent = '0mg';
    document.getElementById('magnesium').textContent = '0mg';
  }
  
  const ingredientsList = document.getElementById('ingredients-list');
  ingredientsList.innerHTML = '';
  
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
  } else {
    ingredientsList.innerHTML = '<li>No ingredients listed</li>';
  }
  
  const instructionsList = document.getElementById('instructions-list');
  instructionsList.innerHTML = '';
  
  if (recipe.instructions && recipe.instructions.length > 0) {
    recipe.instructions.forEach(instruction => {
      if (instruction && instruction.trim()) {
        const li = document.createElement('li');
        li.textContent = instruction.trim();
        instructionsList.appendChild(li);
      }
    });
  } else {
    instructionsList.innerHTML = '<li>Instructions not available for this recipe</li>';
  }
  
  if (recipe.videoId) {
    const videoSection = document.getElementById('video-section');
    videoSection.style.display = 'block';
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = `https://www.youtube.com/embed/${recipe.videoId}`;
  } else {
    const videoSection = document.getElementById('video-section');
    videoSection.style.display = 'none';
  }
}

loadRecipeDetails();