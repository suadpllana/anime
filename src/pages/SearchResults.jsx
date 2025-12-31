import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAnimeSearch } from '../hooks/useAnime';
import { unformatSearchTerm } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimeCard from '../components/AnimeCard';
import SearchBar from '../components/SearchBar';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const searchQuery = unformatSearchTerm(search);
  const { data, loading, error } = useAnimeSearch(searchQuery);
  const [sortBy, setSortBy] = useState('score');

  const handleSearch = (newSearch) => {
    navigate(`/${newSearch}`);
  };

  const handleCardClick = (anime) => {
    navigate(`/${search}/${anime.mal_id}`);
  };

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
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <IoMdArrowRoundBack /> Back to Home
        </button>

        <div className={styles.headerContent}>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {loading ? 'Searching...' : error ? 'Search Error' : `Results for "${searchQuery}"`}
          </motion.h1>
          {data.length > 0 && (
            <p className={styles.resultCount}>{data.length} anime found</p>
          )}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <SearchBar onSearch={handleSearch} placeholder="Search another anime..." />
        </motion.div>
      </motion.div>

      {loading ? (
        <LoadingSpinner fullScreen text="Finding anime..." />
      ) : error ? (
        <motion.div className={styles.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>❌ Error</h2>
          <p>{error}</p>
        </motion.div>
      ) : data.length === 0 ? (
        <motion.div className={styles.noResults} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>😔 No Results Found</h2>
          <p>Try searching with different keywords or check the spelling.</p>
        </motion.div>
      ) : (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
                  onCardClick={() => handleCardClick(anime)}
                  searchContext={search}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default SearchResults;
