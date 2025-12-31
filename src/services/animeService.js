const API_BASE_URL = "https://api.jikan.moe/v4";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const cache = new Map();

const getCacheKey = (endpoint, params = {}) => {
  return `${endpoint}_${JSON.stringify(params)}`;
};

const isValidCache = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const animeService = {
  // Search anime
  async searchAnime(query, limit = 6) {
    try {
      const cacheKey = getCacheKey("/anime", { q: query, limit });
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(
        `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Failed to fetch anime");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data || [];
    } catch (error) {
      console.error("Error searching anime:", error);
      throw error;
    }
  },

  // Get anime details
  async getAnimeDetails(id) {
    try {
      const cacheKey = getCacheKey(`/anime/${id}`);
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(`${API_BASE_URL}/anime/${id}`);
      if (!response.ok) throw new Error("Failed to fetch anime details");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data;
    } catch (error) {
      console.error("Error fetching anime details:", error);
      throw error;
    }
  },

  // Get recommended animes
  async getRecommendations(id) {
    try {
      const cacheKey = getCacheKey(`/anime/${id}/recommendations`);
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(`${API_BASE_URL}/anime/${id}/recommendations`);
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data?.slice(0, 6) || [];
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return [];
    }
  },

  // Get news
  async getNews(id) {
    try {
      const cacheKey = getCacheKey(`/anime/${id}/news`);
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(`${API_BASE_URL}/anime/${id}/news`);
      if (!response.ok) throw new Error("Failed to fetch news");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data?.slice(0, 5) || [];
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },

  // Get top anime (with filters)
  async getTopAnime(type = null, filter = null, page = 1) {
    try {
      let url = `${API_BASE_URL}/top/anime?page=${page}`;
      
      if (type) url += `&type=${type}`;
      if (filter) url += `&filter=${filter}`;

      const cacheKey = getCacheKey("/top/anime", { type, filter, page });
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch top anime");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data || [];
    } catch (error) {
      console.error("Error fetching top anime:", error);
      throw error;
    }
  },

  // Get seasonal anime
  async getSeasonalAnime(year, season) {
    try {
      const cacheKey = getCacheKey("/seasons", { year, season });
      const cached = cache.get(cacheKey);
      
      if (cached && isValidCache(cached.timestamp)) {
        return cached.data;
      }

      const response = await fetch(`${API_BASE_URL}/seasons/${year}/${season}`);
      if (!response.ok) throw new Error("Failed to fetch seasonal anime");
      
      const data = await response.json();
      cache.set(cacheKey, { data: data.data, timestamp: Date.now() });
      return data.data || [];
    } catch (error) {
      console.error("Error fetching seasonal anime:", error);
      return [];
    }
  },

  // Clear cache
  clearCache() {
    cache.clear();
  }
};

export default animeService;
