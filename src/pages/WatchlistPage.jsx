import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWatchlist } from '../hooks/useHelpers';
import AnimeCard from '../components/AnimeCard';
import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './WatchlistPage.module.css';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  const handleCardClick = (anime) => {
    const titleSearch = (anime.title_english || anime.title).toLowerCase().replace(/\s+/g, '-');
    navigate(`/${titleSearch}/${anime.mal_id}`);
  };

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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className={styles.title}>My Watchlist</h1>
          <p className={styles.count}>
            {watchlist.length === 0 ? 'No anime yet' : `${watchlist.length} anime in your watchlist`}
          </p>
        </motion.div>
      </motion.div>

      {watchlist.length === 0 ? (
        <motion.div className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>📺 Your watchlist is empty</h2>
          <p>Start adding anime to keep track of what you want to watch!</p>
          <button
            className={styles.exploreButton}
            onClick={() => navigate('/')}
          >
            Explore Anime
          </button>
        </motion.div>
      ) : (
        <motion.section
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.grid}>
            {watchlist.map((anime) => (
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
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default WatchlistPage;
