import { useState, useEffect, useCallback } from 'react';
import animeService from '../services/animeService';

export const useAnimeSearch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await animeService.searchAnime(searchQuery);
      setData(results);
    } catch (err) {
      setError(err.message || 'Failed to search anime');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  return { data, loading, error, search };
};

export const useAnimeDetails = (id) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const [animeData, recsData, newsData] = await Promise.all([
          animeService.getAnimeDetails(id),
          animeService.getRecommendations(id),
          animeService.getNews(id),
        ]);

        setAnime(animeData);
        setRecommendations(recsData);
        setNews(newsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { anime, loading, error, recommendations, news };
};

export const useTopAnime = (type = null, filter = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTopAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await animeService.getTopAnime(type, filter, page);
        setData(results);
      } catch (err) {
        setError(err.message || 'Failed to fetch top anime');
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, [type, filter, page]);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  return { data, loading, error, page, nextPage, prevPage };
};

export const useSeasonalAnime = (year, season) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonalAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await animeService.getSeasonalAnime(year, season);
        setData(results);
      } catch (err) {
        setError(err.message || 'Failed to fetch seasonal anime');
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonalAnime();
  }, [year, season]);

  return { data, loading, error };
};
