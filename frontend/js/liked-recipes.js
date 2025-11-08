const API_BASE = 'http://localhost:3000/api';
const recipeGrid = document.getElementById('recipe-grid');
const loader = document.getElementById('loader');
const emptyState = document.getElementById('empty-state');
const navSearchInput = document.getElementById('nav-search-input');
const navSearchBtn = document.getElementById('nav-search-btn');

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

async function loadLikedRecipes() {
  try {
    loader.style.display = 'block';
    recipeGrid.innerHTML = '';
    emptyState.style.display = 'none';
    
    const response = await fetch(`${API_BASE}/liked`);
    if (!response.ok) throw new Error('Failed to fetch liked recipes');
    
    const recipes = await response.json();
    loader.style.display = 'none';
    
    if (recipes.length === 0) {
      emptyState.style.display = 'block';
      return;
    }
    
    displayRecipes(recipes);
  } catch (error) {
    loader.style.display = 'none';
    recipeGrid.innerHTML = '<p style="text-align:center; color:#666; grid-column: 1/-1;">⚠️ Unable to load liked recipes. Please try again later.</p>';
    console.error('Error loading liked recipes:', error);
  }
}

function displayRecipes(recipes) {
  recipeGrid.innerHTML = '';
  
  recipes.forEach((recipe, index) => {
    const recipeId = recipe.id;
    
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const imageUrl = recipe.image || 'https://via.placeholder.com/300x220?text=No+Image';
    
    card.innerHTML = `
      <div class="like-badge liked" data-recipe-id="${recipeId}">
        ❤️
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
      await unlikeRecipe(recipeId, card);
    });
    
    recipeGrid.appendChild(card);
  });
}

async function unlikeRecipe(recipeId, cardElement) {
  try {
    const response = await fetch(`${API_BASE}/liked/${recipeId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      cardElement.style.transform = 'scale(0)';
      cardElement.style.opacity = '0';
      
      setTimeout(() => {
        cardElement.remove();
        
        if (recipeGrid.children.length === 0) {
          emptyState.style.display = 'block';
        }
      }, 300);
    }
  } catch (error) {
    console.error('Error unliking recipe:', error);
  }
}

loadLikedRecipes();