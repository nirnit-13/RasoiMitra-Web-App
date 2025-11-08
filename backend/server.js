const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const NINJA_API_KEY = process.env.NINJA_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const likedRecipes = new Map();

app.get('/api/popular-recipes', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?number=12&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Spoonacular API Error:', data);
      if (data.code === 402) {
        return res.status(402).json({ 
          error: 'API quota exceeded. Please wait or upgrade your Spoonacular plan.',
          code: 402 
        });
      }
      throw new Error('Failed to fetch recipes');
    }
    
    res.json(data.results || []);
  } catch (error) {
    console.error('Error fetching popular recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch popular recipes. API quota may be exceeded.' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=20&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Spoonacular API Error:', data);
      if (data.code === 402) {
        return res.status(402).json({ 
          error: 'API quota exceeded. Please wait or upgrade your Spoonacular plan.',
          code: 402 
        });
      }
      throw new Error('Failed to search recipes');
    }
    
    res.json(data.results || []);
  } catch (error) {
    console.error('Error searching recipes:', error.message);
    res.status(500).json({ error: 'Failed to search recipes. API quota may be exceeded.' });
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipeResponse = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const data = await recipeResponse.json();
    
    if (!recipeResponse.ok) {
      console.error('Spoonacular API Error:', data);
      if (data.code === 402) {
        return res.status(402).json({ 
          error: 'API quota exceeded. Please wait or upgrade your Spoonacular plan.',
          code: 402 
        });
      }
      throw new Error('Recipe not found');
    }
    
    const recipe = data;

    let nutritionData = null;
    if (recipe.nutrition && recipe.nutrition.nutrients) {
      const nutrients = recipe.nutrition.nutrients;
      nutritionData = {
        calories: nutrients.find(n => n.name === 'Calories')?.amount || 0,
        protein: nutrients.find(n => n.name === 'Protein')?.amount || 0,
        carbs: nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0,
        fat: nutrients.find(n => n.name === 'Fat')?.amount || 0,
        fiber: nutrients.find(n => n.name === 'Fiber')?.amount || 0,
        sugar: nutrients.find(n => n.name === 'Sugar')?.amount || 0,
        sodium: nutrients.find(n => n.name === 'Sodium')?.amount || 0,
        cholesterol: nutrients.find(n => n.name === 'Cholesterol')?.amount || 0,
        saturatedFat: nutrients.find(n => n.name === 'Saturated Fat')?.amount || 0,
        vitaminC: nutrients.find(n => n.name === 'Vitamin C')?.amount || 0,
        calcium: nutrients.find(n => n.name === 'Calcium')?.amount || 0,
        iron: nutrients.find(n => n.name === 'Iron')?.amount || 0,
        potassium: nutrients.find(n => n.name === 'Potassium')?.amount || 0,
        vitaminA: nutrients.find(n => n.name === 'Vitamin A')?.amount || 0,
        vitaminB6: nutrients.find(n => n.name === 'Vitamin B6')?.amount || 0,
        magnesium: nutrients.find(n => n.name === 'Magnesium')?.amount || 0
      };
    }

    let videoId = null;
    if (YOUTUBE_API_KEY) {
      try {
        const searchQuery = `how to make ${recipe.title} recipe step by step`;
        const youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=medium&videoEmbeddable=true&maxResults=3&key=${YOUTUBE_API_KEY}`
        );
        if (youtubeResponse.ok) {
          const youtubeData = await youtubeResponse.json();
          if (youtubeData.items && youtubeData.items.length > 0) {
            for (const item of youtubeData.items) {
              const title = item.snippet.title.toLowerCase();
              const recipeTitle = recipe.title.toLowerCase();
              const recipeWords = recipeTitle.split(' ');
              const matchCount = recipeWords.filter(word => title.includes(word)).length;
              
              if (matchCount >= 2 || title.includes('recipe') || title.includes('how to make')) {
                videoId = item.id.videoId;
                break;
              }
            }
            if (!videoId) {
              videoId = youtubeData.items[0].id.videoId;
            }
          }
        }
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      }
    }

    const instructions = [];
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
      recipe.analyzedInstructions[0].steps.forEach(step => {
        instructions.push(step.step);
      });
    } else if (recipe.instructions) {
      const steps = recipe.instructions.replace(/<[^>]*>/g, '').split(/\d+\.\s+/).filter(s => s.trim());
      instructions.push(...steps);
    }

    res.json({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      servings: recipe.servings,
      readyInMinutes: recipe.readyInMinutes,
      cuisines: recipe.cuisines || [],
      ingredients: recipe.extendedIngredients?.map(ing => ing.original) || [],
      instructions: instructions,
      nutrition: nutritionData,
      videoId: videoId
    });
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe details. API quota may be exceeded.' });
  }
});

app.get('/api/liked', (req, res) => {
  const recipes = Array.from(likedRecipes.values());
  res.json(recipes);
});

app.post('/api/liked/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = req.body;
    
    likedRecipes.set(id, recipe);
    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like recipe' });
  }
});

app.delete('/api/liked/:id', (req, res) => {
  const { id } = req.params;
  likedRecipes.delete(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 RasoiMitra backend running on http://localhost:${PORT}`);
  console.log(`⚠️  Free tier limit: 150 requests/day`);
});