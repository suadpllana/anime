# AnimeHub - Modern Anime Discovery Platform

A beautiful, fast, and feature-rich anime discovery application built with React, Vite, and modern web technologies.

## ✨ Features

### Core Features
- 🔍 **Advanced Search** - Search and discover anime with optimized API caching
- 📺 **Trending & Popular** - View trending, popular, upcoming, and seasonal anime
- ⭐ **Detailed Information** - Access comprehensive anime details including ratings, episodes, genres, and descriptions
- 🎬 **Trailers** - Watch anime trailers directly in the app
- 📝 **News Updates** - Stay updated with latest anime news
- 💾 **Smart Watchlist** - Persistent watchlist with local storage sync
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices

### Technical Highlights
- **Performance Optimized** - API response caching, lazy loading images, code splitting
- **Modern Architecture** - Custom hooks, service layer, Zustand state management
- **Beautiful UI** - Gradient backgrounds, smooth animations, modern design system
- **Error Handling** - Error boundaries, retry logic, user-friendly error messages
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML
- **Type Safety** - Zod validation for all user inputs

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: CSS Modules with design tokens
- **State Management**: Zustand
- **Form Validation**: Zod
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: React Icons & Lucide React
- **Notifications**: React Toastify
- **Routing**: React Router v7
- **Data Source**: Jikan API (MyAnimeList)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimeCard.jsx   # Anime card with image & info
│   ├── ErrorBoundary.jsx # Error handling wrapper
│   ├── Header.jsx       # Top navigation bar
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── Modal.jsx        # Reusable modal dialog
│   └── SearchBar.jsx    # Search input component
├── hooks/              # Custom React hooks
│   ├── useAnime.js     # Anime data fetching hooks
│   └── useHelpers.js   # Helper hooks (watchlist, storage)
├── pages/              # Page components
│   ├── AnimeDetail.jsx # Detailed anime view
│   ├── GenreAnimes.jsx # Genre/filter results
│   ├── Home.jsx        # Landing page
│   ├── SearchResults.jsx # Search results page
│   └── WatchlistPage.jsx # Watchlist view
├── services/           # API services
│   └── animeService.js # Jikan API wrapper with caching
├── store/              # Zustand state management
│   └── store.js        # Global state stores
├── styles/             # Global styles
│   └── globals.css     # Design tokens & utilities
├── utils/              # Utility functions
│   ├── helpers.js      # Data formatting helpers
│   └── validation.js   # Input validation schemas
└── App.jsx             # Main app component
```

## 🎯 Key Improvements Made

### 1. Architecture & Organization
- ✅ Modular folder structure for better scalability
- ✅ Separated concerns: components, hooks, services, stores
- ✅ Single responsibility principle throughout
- ✅ Easy to extend with new features

### 2. State Management
- ✅ Replaced Context API with Zustand for better performance
- ✅ Persistent storage of watchlist and theme preferences
- ✅ Centralized filter and search history management
- ✅ Type-safe state updates

### 3. Performance Optimizations
- ✅ API response caching (30-minute TTL)
- ✅ Lazy loading images with native `loading="lazy"`
- ✅ Code splitting with React Router
- ✅ Optimized re-renders with React hooks
- ✅ Minimal bundle size with Vite

### 4. UI/UX Improvements
- ✅ Modern, dark theme design with gradient effects
- ✅ Smooth animations powered by Framer Motion
- ✅ Consistent design system with CSS variables
- ✅ Responsive grid layouts for all screen sizes
- ✅ Loading spinners and error states
- ✅ Toast notifications for user feedback
- ✅ Hover effects and visual feedback

### 5. Error Handling & Validation
- ✅ Error Boundary component for graceful error handling
- ✅ Input validation with Zod schemas
- ✅ Try-catch blocks in async operations
- ✅ User-friendly error messages
- ✅ Retry mechanisms for failed requests

### 6. Accessibility
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Semantic HTML structure
- ✅ Color contrast compliance
- ✅ Alt text for all images

### 7. Developer Experience
- ✅ Clear code organization
- ✅ Comprehensive comments and documentation
- ✅ Reusable component patterns
- ✅ Helper functions for common tasks
- ✅ ESLint configuration

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/anime.git
cd anime
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 📊 Component Architecture

### AnimeCard
Displays anime information with image, title, rating, type, and synopsis.

### Header
Navigation bar with links to different sections and watchlist counter.

### SearchBar
Validated search input with autocomplete suggestions.

### Modal
Reusable dialog component for trailers and other content.

### LoadingSpinner
Animated loading indicator for async operations.

### ErrorBoundary
Catches React errors and displays fallback UI.

## 🔌 Custom Hooks

### useAnimeSearch(query)
Search anime by query with loading and error states.

### useAnimeDetails(id)
Fetch detailed anime info, recommendations, and news.

### useTopAnime(type, filter)
Get top anime with optional type and filter parameters.

### useWatchlist()
Manage watchlist with add, remove, and check functions.

### useLocalStorage(key, initialValue)
Persist and retrieve data from localStorage.

## 🌐 API Integration

The app uses the [Jikan API](https://docs.api.jikan.moe/) (MyAnimeList) for:
- Anime search
- Detailed anime information
- Top/trending anime lists
- Recommendations
- News updates
- Seasonal anime

All API calls are cached for 30 minutes to improve performance.

## 🎨 Design System

### Colors
- **Primary**: `#ffdd95` (Gold)
- **Secondary**: `#00c6ff` (Cyan)
- **Accent**: `#ff6b6b` (Red)
- **Dark Background**: `#0f0f0f`
- **Text Primary**: `#ffffff`

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: Scaled from 0.875rem to 3.5rem
- **Font Weights**: 400, 500, 600, 700, 800

### Spacing
- **Base Unit**: 0.5rem
- **Scale**: xs (0.5rem) to xl (3rem)

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🔄 Future Enhancements

- [ ] User authentication and profiles
- [ ] Anime ratings and reviews
- [ ] Episode tracking
- [ ] Social sharing features
- [ ] Dark/Light theme toggle (UI prepared)
- [ ] Advanced filtering options
- [ ] Manga support
- [ ] PWA support
- [ ] International language support

## 📝 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for anime lovers
