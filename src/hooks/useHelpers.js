import { useState, useCallback, useEffect } from 'react';
import { useWatchlistStore } from '../store/store';
import { toast } from 'react-toastify';

export const useWatchlist = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);
  const isInWatchlist = useWatchlistStore((state) => state.isInWatchlist);
  const clearWatchlist = useWatchlistStore((state) => state.clearWatchlist);
  const getWatchlistCount = useWatchlistStore((state) => state.getWatchlistCount);

  const handleAddToWatchlist = useCallback(
    (anime) => {
      if (isInWatchlist(anime.mal_id)) {
        toast.info('Already in your watchlist');
        return false;
      }
      addToWatchlist(anime);
      toast.success(`${anime.title_english || anime.title} added to watchlist!`);
      return true;
    },
    [addToWatchlist, isInWatchlist]
  );

  const handleRemoveFromWatchlist = useCallback(
    (animeId, title = 'Anime') => {
      removeFromWatchlist(animeId);
      toast.success(`${title} removed from watchlist`);
    },
    [removeFromWatchlist]
  );

  return {
    watchlist,
    addToWatchlist: handleAddToWatchlist,
    removeFromWatchlist: handleRemoveFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    watchlistCount: getWatchlistCount(),
  };
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
