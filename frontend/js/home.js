const API_BASE = 'http://localhost:3000/api';
const recipeGrid = document.getElementById('recipe-grid');
const loader = document.getElementById('loader');
const navSearchInput = document.getElementById('nav-search-input');
const navSearchBtn = document.getElementById('nav-search-btn');

let likedRecipes = new Set();

async function loadLikedRecipes() {
  try {
    const response = await fetch(`${API_BASE}/liked`);
    if (response.ok) {
      const recipes = await response.json();
      likedRecipes = new Set(recipes.map(r => r.id));
    }
  } catch (error) {
    console.error('Error loading liked recipes:', error);
  }
}

navSearchBtn.addEventListener('click', () => {
  const query = navSearchInput.value.trim();
  if (query) {
    window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
  }
});

navSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    navSearchBtn.click();
  }
});

async function loadPopularRecipes() {
  try {
    loader.style.display = 'block';
    recipeGrid.innerHTML = '';
    
    const response = await fetch(`${API_BASE}/popular-recipes`);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    
    const recipes = await response.json();
    loader.style.display = 'none';
    
    if (recipes.length === 0) {
      recipeGrid.innerHTML = '<p style="text-align:center; color:#666; grid-column: 1/-1;">No recipes available.</p>';
      return;
    }
    
    displayRecipes(recipes);
  } catch (error) {
    loader.style.display = 'none';
    recipeGrid.innerHTML = '<p style="text-align:center; color:#666; grid-column: 1/-1;">⚠️ Unable to load recipes. Please try again later.</p>';
    console.error('Error loading recipes:', error);
  }
}

function displayRecipes(recipes) {
  recipeGrid.innerHTML = '';
  
  recipes.forEach((recipe, index) => {
    const recipeId = recipe.id;
    const isLiked = likedRecipes.has(recipeId);
    
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const imageUrl = recipe.image || 'https://via.placeholder.com/300x220?text=No+Image';
    
    card.innerHTML = `
      <div class="like-badge ${isLiked ? 'liked' : ''}" data-recipe-id="${recipeId}">
        ${isLiked ? '❤️' : '🤍'}
      </div>
      <img src="${imageUrl}" alt="${recipe.title}" onerror="this.src='https://via.placeholder.com/300x220?text=No+Image'">
      <div class="recipe-card-content">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span>🍽️ Recipe</span>
        </div>
      </div>
    `;
    
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('like-badge')) {
        window.location.href = `recipe-details.html?id=${recipeId}`;
      }
    });
    
    const likeBadge = card.querySelector('.like-badge');
    likeBadge.addEventListener('click', async (e) => {
      e.stopPropagation();
      await toggleLike(recipeId, recipe, likeBadge);
    });
    
    recipeGrid.appendChild(card);
  });
}

async function toggleLike(recipeId, recipe, badgeElement) {
  try {
    if (likedRecipes.has(recipeId)) {
      const response = await fetch(`${API_BASE}/liked/${recipeId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        likedRecipes.delete(recipeId);
        badgeElement.textContent = '🤍';
        badgeElement.classList.remove('liked');
      }
    } else {
      const response = await fetch(`${API_BASE}/liked/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      
      if (response.ok) {
        likedRecipes.add(recipeId);
        badgeElement.textContent = '❤️';
        badgeElement.classList.add('liked');
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
}

loadLikedRecipes().then(() => loadPopularRecipes());