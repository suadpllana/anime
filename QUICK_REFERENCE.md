# Quick Reference Guide - AnimeHub

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

---

## 📁 File Navigation

### Adding a New Page
1. Create file: `src/pages/YourPage.jsx`
2. Create styles: `src/pages/YourPage.module.css`
3. Add route in `src/App.jsx`
4. Export and use

### Creating a New Component
```javascript
// src/components/YourComponent.jsx
import styles from './YourComponent.module.css'

const YourComponent = ({ prop1, prop2 }) => {
  return (
    <div className={styles.container}>
      {/* Your JSX */}
    </div>
  )
}

export default YourComponent
```

### Creating a New Hook
```javascript
// src/hooks/useYourHook.js
import { useState, useEffect } from 'react'

export const useYourHook = (param) => {
  const [state, setState] = useState(null)
  
  useEffect(() => {
    // Your logic
  }, [param])
  
  return { state }
}
```

---

## 🎨 Styling Guide

### Using Design Tokens
```css
/* CSS variables available globally */
--color-primary: #ffdd95
--color-secondary: #00c6ff
--color-accent: #ff6b6b
--spacing-sm: 1rem
--spacing-md: 1.5rem
```

### CSS Modules Example
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}
```

### Responsive Breakpoints
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small Mobile */ }
```

---

## 🔌 Common Hook Patterns

### Fetching Anime Data
```javascript
import { useAnimeSearch } from '@/hooks/useAnime'

const MyComponent = () => {
  const { data, loading, error } = useAnimeSearch('Naruto')
  
  if (loading) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {data.map(anime => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  )
}
```

### Using Watchlist
```javascript
import { useWatchlist } from '@/hooks/useHelpers'

const MyComponent = ({ anime }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  
  const inWatchlist = isInWatchlist(anime.mal_id)
  
  const handleToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id, anime.title_english)
    } else {
      addToWatchlist(anime)
    }
  }
  
  return (
    <button onClick={handleToggle}>
      {inWatchlist ? 'Remove' : 'Add'} to Watchlist
    </button>
  )
}
```

### Anime Details with All Data
```javascript
import { useAnimeDetails } from '@/hooks/useAnime'

const AnimeDetailPage = ({ id }) => {
  const { anime, recommendations, news, loading } = useAnimeDetails(id)
  
  if (loading) return <LoadingSpinner fullScreen />
  
  return (
    <>
      <h1>{anime?.title_english}</h1>
      <p>{anime?.synopsis}</p>
      
      {news.map(item => (
        <div key={item.mal_id}>{item.title}</div>
      ))}
      
      {recommendations.map(rec => (
        <div key={rec.entry.mal_id}>{rec.entry.title}</div>
      ))}
    </>
  )
}
```

---

## 🎯 State Management Examples

### Using Zustand Stores
```javascript
import { useWatchlistStore } from '@/store/store'

// In your component
const watchlist = useWatchlistStore(state => state.watchlist)
const addToWatchlist = useWatchlistStore(state => state.addToWatchlist)

// Use them
addToWatchlist(anime)
```

### Theme Toggle (Ready to use)
```javascript
import { useThemeStore } from '@/store/store'

const { isDark, toggleTheme } = useThemeStore()

// Your theme-aware UI
const bgColor = isDark ? '#0f0f0f' : '#ffffff'
```

---

## ✅ Input Validation

### Validating Search Input
```javascript
import { validateSearch } from '@/utils/validation'

const input = "Naruto"
const { valid, error } = validateSearch(input)

if (!valid) {
  toast.warning(error) // Shows "Search query must be at least 2 characters"
}
```

### Validating Anime Data
```javascript
import { validateAnime } from '@/utils/validation'

const { valid, error } = validateAnime(animeData)
```

---

## 🐛 Error Handling

### Try-Catch Pattern
```javascript
try {
  const data = await animeService.searchAnime(query)
  setData(data)
} catch (error) {
  toast.error(error.message || 'Failed to fetch')
  setError(error)
} finally {
  setLoading(false)
}
```

### Using Error Boundary
```javascript
import ErrorBoundary from '@/components/ErrorBoundary'

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## 🎬 Animation Examples

### Button Hover Effect
```javascript
import { motion } from 'framer-motion'

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Fade In on Load
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Stagger Children
```javascript
<motion.div initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 📱 Responsive Tips

### Mobile-First Approach
```javascript
// Start with mobile styles
.card {
  grid-template-columns: 1fr; // Mobile
  gap: 1rem;
}

// Then enhance for larger screens
@media (min-width: 768px) {
  .card {
    grid-template-columns: 1fr 1fr; // Tablet
  }
}

@media (min-width: 1024px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr; // Desktop
  }
}
```

### Flexible Images
```css
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}
```

---

## 🔍 Debugging Tips

### Check Component State with Zustand
```javascript
// In browser console
import { useWatchlistStore } from './store/store'
const store = useWatchlistStore.getState()
console.log(store.watchlist)
```

### View Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Search for "api.jikan"
4. Check cached responses (should show from cache)

### Performance Monitoring
1. React DevTools -> Profiler
2. Click record
3. Interact with app
4. Check render times

---

## 🎯 Common Tasks

### Search for Anime
```javascript
const navigate = useNavigate()
navigate(`/${searchTerm}`) // Navigates to search results
```

### View Anime Details
```javascript
const navigate = useNavigate()
navigate(`/${animeName}/${animeId}`) // Shows detail page
```

### Filter by Type
```javascript
navigate(`/genre/home?type=tv`) // TV series
navigate(`/genre/home?type=movie`) // Movies
navigate(`/genre/home?filter=airing`) // Currently airing
navigate(`/genre/home?filter=upcoming`) // Upcoming
```

### Access Watchlist
```javascript
navigate(`/watchlist`)
```

---

## 🚨 Common Errors & Solutions

### "Cannot read property 'mal_id' of undefined"
```javascript
// ❌ Wrong
const id = anime.mal_id

// ✅ Right
const id = anime?.mal_id
```

### Image not loading
```javascript
// ✅ Always provide alt text and fallback
<img 
  src={anime?.images?.jpg?.large_image_url} 
  alt={anime.title_english || 'Anime'} 
  onError={(e) => e.target.style.display = 'none'}
/>
```

### State not updating
```javascript
// ✅ Remember dependency arrays
useEffect(() => {
  // your code
}, [dependency]) // Include all used variables
```

---

## 📊 Data Structure Reference

### Anime Object
```javascript
{
  mal_id: 123,
  title: "Anime Name",
  title_english: "English Title",
  title_japanese: "日本語",
  score: 8.5,
  type: "TV", // TV, Movie, etc
  status: "Finished Airing",
  episodes: 24,
  duration: "24 min per ep",
  images: {
    jpg: {
      image_url: "...",
      small_image_url: "...",
      large_image_url: "..."
    }
  },
  synopsis: "Description...",
  aired: { string: "Jan 10, 2024" },
  genres: [
    { mal_id: 1, name: "Action", type: "genre" }
  ],
  trailer: {
    youtube_id: "..."
  }
}
```

---

## 🎓 Learning Resources

### Technologies Used
- [React 19 Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com)
- [Zod Validation](https://zod.dev)

### API Documentation
- [Jikan API](https://docs.api.jikan.moe/)
- [MyAnimeList](https://myanimelist.net/)

---

## 💾 Storage Notes

### LocalStorage Keys
- `anime-watchlist` - Stores watchlist JSON
- `anime-theme` - Stores theme preference

### API Cache
- Cached automatically for 30 minutes
- Clear with: `animeService.clearCache()`

---

## 🔐 Best Practices

✅ **DO:**
- Use CSS modules for component styles
- Validate user input with Zod
- Handle errors gracefully
- Show loading states
- Use semantic HTML

❌ **DON'T:**
- Use inline styles (use CSS modules)
- Ignore error states
- Skip accessibility attributes
- Forget loading states
- Use random keys in lists (use id)

---

## 📞 Support & Help

### Common Commands
```bash
npm run dev      # Start dev server
npm run build    # Create production build
npm run lint     # Check code quality
npm run deploy   # Deploy to GitHub Pages
npm run preview  # Preview production build
```

### Folder Structure Help
- **components/** - Reusable components
- **pages/** - Full page components
- **hooks/** - Custom React hooks
- **services/** - API integration
- **store/** - State management
- **styles/** - Global styles
- **utils/** - Helpers & validation

### Getting Help
1. Check error messages in browser console
2. Review React DevTools
3. Check Network tab in DevTools
4. Look at IMPROVEMENTS.md for features
5. Check component examples in pages/

---

Generated: December 31, 2025  
Version: 2.0
