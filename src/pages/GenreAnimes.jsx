import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { useTopAnime } from '../hooks/useAnime';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimeCard from '../components/AnimeCard';
import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './GenreAnimes.module.css';

const GenreAnimes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const filter = searchParams.get('filter');
  const { data, loading, error } = useTopAnime(type, filter);
  const [sortBy, setSortBy] = useState('score');

  const filterMap = {
    bypopularity: 'Most Popular',
    favorite: 'Most Favorited',
    airing: 'Trending',
    upcoming: 'Upcoming'
  };

  const displayTitle = type
    ? `${type.charAt(0).toUpperCase() + type.slice(1)} Anime`
    : filterMap[filter] || 'Anime';

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'score') {
      return (b.score || 0) - (a.score || 0);
    } else if (sortBy === 'name') {
      return (a.title_english || a.title).localeCompare(b.title_english || b.title);
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      <motion.div className={styles.header} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <IoMdArrowRoundBack /> Back to Home
        </button>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {displayTitle}
        </motion.h1>
      </motion.div>

      {loading ? (
        <LoadingSpinner fullScreen text="Loading anime..." />
      ) : error ? (
        <motion.div className={styles.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>❌ Error</h2>
          <p>{error}</p>
        </motion.div>
      ) : data.length === 0 ? (
        <motion.div className={styles.noResults} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>😔 No Anime Found</h2>
          <p>Try different filters or search options.</p>
        </motion.div>
      ) : (
        <motion.section className={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.controls}>
            <div className={styles.sortControl}>
              <FaFilter />
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="score">Rating (High to Low)</option>
                <option value="name">Name (A to Z)</option>
              </select>
            </div>
            <p className={styles.count}>{data.length} anime available</p>
          </div>

          <div className={styles.grid}>
            {sortedData.map((anime) => (
              <motion.div
                key={anime.mal_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <AnimeCard
                  anime={anime}
                  onCardClick={() => {
                    const titleSearch = (anime.title_english || anime.title).toLowerCase().replace(/\s+/g, '-');
                    navigate(`/${titleSearch}/${anime.mal_id}`);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default GenreAnimes;
