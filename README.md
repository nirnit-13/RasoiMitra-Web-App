# 🍲 RasoiMitra - Smart Recipe Companion

A modern, interactive web application for discovering recipes with detailed nutritional information, step-by-step cooking instructions, and video tutorials. Built with a clean architecture featuring a Node.js backend and vanilla JavaScript frontend.

![RasoiMitra Banner](https://img.shields.io/badge/Recipe-Finder-ff6a88?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 User Interface
- **Interactive Landing Page**: Animated welcome screen with floating food emojis
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Hidden Scrollbars**: Clean, modern scrolling experience
- **Sticky Navigation**: Back button stays accessible while scrolling

### 🔍 Recipe Discovery
- **Browse Popular Recipes**: Explore trending and popular dishes
- **Smart Search**: Find recipes by name, ingredients, or cuisine
- **Recipe Cards**: Beautiful, interactive cards with hover effects
- **Detailed Recipe View**: Complete information including ingredients, instructions, and nutrition

### 📊 Nutritional Information
Comprehensive nutrition data for every recipe:
- Calories, Protein, Carbs, Fat
- Fiber, Sugar, Sodium, Cholesterol
- Saturated Fat, Potassium
- Vitamins (A, B6, C)
- Minerals (Calcium, Iron, Magnesium)

### 🎥 Video Tutorials
- **Embedded YouTube Videos**: Watch cooking tutorials directly on the site
- **Smart Video Selection**: Algorithm picks the most relevant cooking video
- **Responsive Video Player**: Optimized viewing on all devices

### ❤️ Personalization
- **Like/Unlike Recipes**: Save your favorite recipes with a heart icon
- **Liked Recipes Page**: View all your saved recipes in one place
- **Persistent Storage**: Backend stores your preferences during the session

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom animations, gradients, and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Google Fonts**: Poppins font family

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### APIs
- **Spoonacular API**: Recipe data and nutritional information
- **YouTube Data API v3**: Video tutorials
- **API Ninjas**: Additional nutritional data (backup)

## 📁 Project Structure

```
rasoimitra/
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Node.js dependencies
│   ├── .env               # API keys (not committed to Git)
│   └── .gitignore         # Git ignore rules
├── frontend/
│   ├── index.html         # Landing page
│   ├── home.html          # Main recipes page
│   ├── search-results.html # Search results page
│   ├── recipe-details.html # Individual recipe page
│   ├── liked-recipes.html  # Saved recipes page
│   ├── css/
│   │   ├── index.css      # Landing page styles
│   │   ├── common.css     # Shared styles (navbar, buttons)
│   │   ├── home.css       # Home page styles
│   │   ├── search-results.css
│   │   ├── recipe-details.css
│   │   └── liked-recipes.css
│   ├── js/
│   │   ├── index.js       # Landing page interactions
│   │   ├── home.js        # Home page logic
│   │   ├── search-results.js
│   │   ├── recipe-details.js
│   │   └── liked-recipes.js
│   └── images/
│       └── rasoimitra-logo.png
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Spoonacular API key
- YouTube Data API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rasoimitra.git
cd rasoimitra
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `backend/` directory:
```env
PORT=3000
SPOONACULAR_API_KEY=your_spoonacular_api_key
NINJA_API_KEY=your_ninja_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

4. **Add your logo**

Place your `rasoimitra-logo.png` file in `frontend/images/` directory.

### Getting API Keys

#### Spoonacular API
1. Visit [Spoonacular API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Free tier: 150 requests/day

#### YouTube Data API v3
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key

#### API Ninjas (Optional)
1. Visit [API Ninjas](https://api-ninjas.com/)
2. Sign up and get your API key
3. Used as backup for nutrition data

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm start
```

You should see:
```
🚀 RasoiMitra backend running on http://localhost:3000
⚠️  Free tier limit: 150 requests/day
```

2. **Access the application**

Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 Usage Guide

### Browsing Recipes
1. Click "Start Cooking" on the landing page
2. Browse popular recipes on the home page
3. Click any recipe card to view details

### Searching Recipes
1. Use the search bar in the navigation
2. Type recipe name or ingredients
3. Press Enter or click the search button
4. Browse the search results

### Viewing Recipe Details
1. Click on any recipe card
2. View ingredients, instructions, and nutrition
3. Watch the embedded video tutorial
4. Click the heart to save the recipe

### Managing Liked Recipes
1. Click the heart icon on any recipe
2. Navigate to "Liked Recipes" in the navbar
3. View all your saved recipes
4. Click the heart again to unlike

## 🎨 Design Features

### Color Palette
- Primary Pink: `#ff6a88`
- Primary Orange: `#ff9a56`
- Light Background: `#ffecd2` to `#fcb69f`
- Accent: `#fff8f0` to `#ffe0e9`

### Typography
- Font Family: Poppins (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 600 (Semi-Bold), 700 (Bold)

### Animations
- Fade-in effects on page load
- Hover animations on cards and buttons
- Floating logo animation
- Heart beat animation on like
- Smooth transitions throughout

## 🔒 Security

### API Key Protection
- API keys stored in `.env` file
- `.gitignore` prevents committing `.env`
- Backend serves as proxy to hide keys from frontend
- Never expose API keys in client-side code

### Best Practices
```bash
# Always verify before pushing to Git
git status  # Should NOT show .env file
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Recipes not loading**
- Check if backend is running (`npm start`)
- Verify API keys in `.env` file
- Check console for error messages
- Spoonacular free tier: 150 requests/day

**Issue: "API quota exceeded"**
- Wait 24 hours for quota reset
- Or create new Spoonacular account
- Or upgrade to paid plan

**Issue: Videos not playing**
- Check YouTube API key validity
- Verify API is enabled in Google Cloud Console
- Some videos may have embedding restrictions

**Issue: PowerShell script execution error**
```powershell
# Run as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Issue: Module not found**
```bash
cd backend
npm install
```

## 📊 API Endpoints

### Backend Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/popular-recipes` | GET | Get 12 popular recipes |
| `/api/search?query=paneer` | GET | Search recipes by query |
| `/api/recipe/:id` | GET | Get detailed recipe info with nutrition & video |
| `/api/liked` | GET | Get all liked recipes |
| `/api/liked/:id` | POST | Add recipe to liked list |
| `/api/liked/:id` | DELETE | Remove recipe from liked list |

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] MySQL database for persistent storage
- [ ] Recipe ratings and reviews
- [ ] Shopping list generation
- [ ] Meal planning feature
- [ ] Print recipe functionality
- [ ] Recipe categories and filters
- [ ] Social sharing options
- [ ] Dark mode support
- [ ] Recipe upload by users

## 📝 Development

### Code Style
- ES6+ JavaScript
- Async/await for API calls
- Arrow functions
- Template literals
- Modular CSS structure

### File Organization
- Separate CSS files for each page
- Separate JS files for each page
- Shared styles in `common.css`
- API logic in backend server

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgments

- **Spoonacular API** for recipe and nutrition data
- **YouTube Data API** for video tutorials
- **API Ninjas** for additional nutrition data
- **Google Fonts** for Poppins font family
- All contributors and users of RasoiMitra

## 📧 Contact

For questions or support:
- Create an issue on GitHub
- Email: your.email@example.com

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ for food lovers everywhere**

**Happy Cooking! 🍳**