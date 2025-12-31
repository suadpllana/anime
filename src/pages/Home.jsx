import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import { useTopAnime } from '../hooks/useAnime';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimeCard from '../components/AnimeCard';
import { topSearchedAnime } from '../topSearchesAnimes';
import aniwatchLogo from '../assets/aniwatchLogo.png';
import aniwatchtvImage from '../assets/aniwatchtv.png';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { data: popularAnimes, loading } = useTopAnime(null, 'bypopularity');

  const handleSearch = (searchTerm) => {
    navigate(`/${searchTerm}`);
  };

  const handleTopSearchClick = (anime) => {
    const formatted = anime.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formatted}`);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.content}>
          <motion.img
            src={aniwatchLogo}
            alt="Aniwatch Logo"
            className={styles.logo}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          <motion.h1
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover Your Next Favorite Anime
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore thousands of anime titles, ratings, and recommendations
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.searchWrapper}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          <motion.div
            className={styles.topSearches}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className={styles.label}>Trending Now:</p>
            <div className={styles.tags}>
              {topSearchedAnime.slice(0, 6).map((anime, index) => (
                <motion.button
                  key={index}
                  className={styles.tag}
                  onClick={() => handleTopSearchClick(anime)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {anime}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.heroImage}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img src={aniwatchtvImage} alt="Anime Banner" />
        </motion.div>
      </motion.div>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className={styles.sectionTitle}>Popular Now</h2>
        {loading ? (
          <LoadingSpinner text="Loading anime..." />
        ) : (
          <div className={styles.grid}>
            {popularAnimes.slice(0, 12).map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} onCardClick={() => {
                navigate(`/${anime.title_english?.toLowerCase().replace(/\s+/g, '-')}/${anime.mal_id}`);
              }} />
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
