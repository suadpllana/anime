import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (anime) => {
        set((state) => {
          const exists = state.watchlist.some(
            (item) => item.mal_id === anime.mal_id
          );
          if (exists) {
            return state;
          }
          return {
            watchlist: [...state.watchlist, anime],
          };
        });
      },

      removeFromWatchlist: (animeId) => {
        set((state) => ({
          watchlist: state.watchlist.filter(
            (item) => item.mal_id !== animeId
          ),
        }));
      },

      isInWatchlist: (animeId) => {
        return get().watchlist.some((item) => item.mal_id === animeId);
      },

      clearWatchlist: () => {
        set({ watchlist: [] });
      },

      getWatchlistCount: () => {
        return get().watchlist.length;
      },
    }),
    {
      name: 'anime-watchlist',
      partialize: (state) => ({ watchlist: state.watchlist }),
    }
  )
);

export const useSearchStore = create((set) => ({
  searchHistory: [],
  currentSearch: '',

  setCurrentSearch: (search) => {
    set({ currentSearch: search });
  },

  addToHistory: (search) => {
    set((state) => {
      // Keep last 10 searches
      const filtered = state.searchHistory.filter((s) => s !== search);
      return {
        searchHistory: [search, ...filtered].slice(0, 10),
      };
    });
  },

  clearHistory: () => {
    set({ searchHistory: [] });
  },
}));

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => {
        set((state) => ({ isDark: !state.isDark }));
      },
      setTheme: (isDark) => {
        set({ isDark });
      },
    }),
    {
      name: 'anime-theme',
    }
  )
);

export const useFilterStore = create((set) => ({
  sortBy: 'score', // score, popularity, name
  filterType: null, // tv, movie, etc
  filterGenre: null,
  filterStatus: null,

  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  setFilterType: (filterType) => {
    set({ filterType });
  },

  setFilterGenre: (filterGenre) => {
    set({ filterGenre });
  },

  setFilterStatus: (filterStatus) => {
    set({ filterStatus });
  },

  resetFilters: () => {
    set({
      sortBy: 'score',
      filterType: null,
      filterGenre: null,
      filterStatus: null,
    });
  },
}));
