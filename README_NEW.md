# AnimeHub - Modern Anime Discovery Platform

> A beautifully redesigned anime discovery application with modern architecture, stunning UI, and professional-grade code quality.

## 🎉 Major Update (v2.0)

This project has been **completely redesigned and modernized** with:
- ✨ Modern, responsive UI with animations
- 🏗️ Enterprise-grade architecture
- ⚡ Performance optimizations & API caching
- 🔒 Robust error handling & validation
- ♿ Full accessibility support
- 📱 Perfect mobile responsiveness

**→ See [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md) for complete details**

## ✨ Features

- 🔍 **Advanced Search** - Find anime with optimized caching
- 📺 **Browse Categories** - Movies, TV series, Trending, Upcoming
- ⭐ **Detailed Info** - Ratings, episodes, genres, synopsis
- 🎬 **Watch Trailers** - View trailers directly in the app
- 📝 **Latest News** - Stay updated with anime news
- 💾 **Smart Watchlist** - Persistent storage of favorites
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Beautiful Design** - Modern UI with smooth animations
- ♿ **Accessible** - WCAG compliant with ARIA labels
- ⚡ **Fast** - Optimized performance with caching

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── store/              # State management (Zustand)
├── styles/             # Global styling & tokens
└── utils/              # Helpers & validation
```

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Lightning-fast build tool
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations
- **CSS Modules** - Scoped styling
- **Zod** - Type-safe validation
- **React Router v7** - Modern routing
- **Jikan API** - MyAnimeList data

## 📚 Documentation

- **[REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)** - Complete overview of improvements
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Code examples & patterns
- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Detailed features list

## 🎯 Key Improvements

### Architecture
- ✅ Modular folder structure
- ✅ Service layer for API calls
- ✅ Custom hooks for data
- ✅ Zustand state management
- ✅ Error boundaries

### Performance
- ✅ API response caching (30 min TTL)
- ✅ Lazy loading images
- ✅ Code splitting with Router
- ✅ Optimized re-renders

### UI/UX
- ✅ Modern dark theme
- ✅ Smooth animations
- ✅ Responsive grid layouts
- ✅ Beautiful color scheme
- ✅ Professional design

### Quality
- ✅ Zod input validation
- ✅ Error boundaries & handling
- ✅ ARIA labels & keyboard nav
- ✅ Semantic HTML
- ✅ ESLint configured

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
npm run deploy   # Deploy to GitHub Pages
```

## 🎨 Design Features

### Color Scheme
```
Primary:   #ffdd95 (Gold)
Secondary: #00c6ff (Cyan)  
Accent:    #ff6b6b (Red)
Dark BG:   #0f0f0f
Text:      #ffffff
```

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 📊 Component Library

- **AnimeCard** - Display anime with image & info
- **Header** - Navigation bar with watchlist
- **SearchBar** - Validated search input
- **LoadingSpinner** - Animated loader
- **Modal** - Reusable dialog
- **ErrorBoundary** - Error handling
- **Pages** - Home, Search, Detail, Genre, Watchlist

## 🔌 Custom Hooks

```javascript
// Fetch anime data
const { data, loading, error } = useAnimeSearch(query)

// Get detailed info, recommendations, news
const { anime, recommendations, news } = useAnimeDetails(id)

// Get top anime
const { data, loading, page } = useTopAnime(type, filter)

// Manage watchlist
const { watchlist, addToWatchlist } = useWatchlist()
```

## 🌐 API Integration

Uses **[Jikan API](https://docs.api.jikan.moe/)** (MyAnimeList)

Features:
- Anime search
- Detailed information
- Top/trending lists
- Recommendations
- News updates
- Seasonal anime

## 📱 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 🔒 Data Validation

All user inputs validated with **Zod**:
- Search queries (min 2 chars)
- Anime data structure
- User interactions

## 🎯 Future Enhancements

Ready for:
- User authentication
- Episode tracking
- Advanced filters
- Dark/Light theme toggle
- Social sharing
- PWA capabilities
- Backend integration

## 🤝 Contributing

Contributions welcome! The codebase is well-organized and documented.

## 📄 License

Open source - MIT License

## 🎓 Learning from This Project

Great examples of:
- Modern React patterns
- State management with Zustand
- Custom hooks design
- CSS Modules & design tokens
- API integration & caching
- Error handling
- Accessibility
- Responsive design

## 📞 Support

For issues or questions:
1. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for examples
2. Review [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md)
3. Check browser console for errors
4. Use React DevTools

---

Made with ❤️ for anime enthusiasts  
**v2.0** - Complete Redesign & Enhancement  
Last updated: December 31, 2025
