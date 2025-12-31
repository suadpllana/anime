import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../hooks/useHelpers';
import { formatSearchTerm, getDisplayTitle, formatScore, truncateText } from '../utils/helpers';
import styles from './AnimeCard.module.css';

const AnimeCard = ({ anime, onCardClick, searchContext }) => {
  const navigate = useNavigate();
  const { isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(anime.mal_id);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(anime);
    } else {
      const hyphenatedSearch = (searchContext || formatSearchTerm(getDisplayTitle(anime))).toLowerCase();
      navigate(`/${hyphenatedSearch}/${anime.mal_id}`);
    }
  };

  const variants = {
    hover: { y: -8, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)' },
  };

  return (
    <motion.div
      className={styles.card}
      whileHover="hover"
      variants={variants}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
          alt={getDisplayTitle(anime)}
          loading="lazy"
        />
        <motion.div className={styles.playButton} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
          <FaPlay size={32} />
        </motion.div>
        {inWatchlist && <div className={styles.watchlistBadge}>In Watchlist</div>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{getDisplayTitle(anime)}</h3>
        <div className={styles.meta}>
          <span className={styles.score}>⭐ {formatScore(anime.score)}</span>
          <span className={styles.type}>{anime.type}</span>
        </div>
        <p className={styles.synopsis}>{truncateText(anime.synopsis, 100)}</p>
      </div>
    </motion.div>
  );
};

export default AnimeCard;
