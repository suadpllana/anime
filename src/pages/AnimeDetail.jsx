import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useAnimeDetails } from '../hooks/useAnime';
import { useWatchlist } from '../hooks/useHelpers';
import { getDisplayTitle } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import styles from './AnimeDetail.module.css';

const AnimeDetail = () => {
  const { id, search } = useParams();
  const navigate = useNavigate();
  const { anime, loading, recommendations, news } = useAnimeDetails(parseInt(id));
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [showTrailer, setShowTrailer] = useState(false);
  const [fullOverview, setFullOverview] = useState(false);

  // Debug: Log trailer data
  React.useEffect(() => {
    if (anime) {
      console.log('Anime data:', anime);
      console.log('Trailer data:', anime.trailer);
    }
  }, [anime]);

  if (loading) return <LoadingSpinner fullScreen text="Loading anime details..." />;
  if (!anime) return <div>Anime not found</div>;

  const inWatchlist = isInWatchlist(anime.mal_id);

  // Extract YouTube ID from trailer if available
  const getYoutubeId = () => {
    if (anime.trailer?.youtube_id) {
      return anime.trailer.youtube_id;
    }
    // Try to extract from URL if youtube_id is not available
    if (anime.trailer?.url) {
      const match = anime.trailer.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const youtubeId = getYoutubeId();

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id, getDisplayTitle(anime));
    } else {
      addToWatchlist(anime);
    }
  };

  const handleRecommendationClick = (recAnime) => {
    navigate(`/${search}/${recAnime.entry.mal_id}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate(`/${search}`)}
        aria-label="Go back"
      >
        <IoMdArrowRoundBack /> Back
      </button>

      <motion.div
        className={styles.mainContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.heroSection}>
          <motion.img
            src={anime.images?.jpg?.large_image_url}
            alt={getDisplayTitle(anime)}
            className={styles.poster}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />

          <div className={styles.details}>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              {getDisplayTitle(anime)}
            </motion.h1>

            <motion.div className={styles.meta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className={styles.score}>⭐ {anime.score?.toFixed(1) || 'N/A'}</span>
              <span className={styles.type}>{anime.type}</span>
              <span className={styles.status}>{anime.status}</span>
            </motion.div>

            <motion.div className={styles.info} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <p><strong>Duration:</strong> {anime.duration || 'N/A'}</p>
              <p><strong>Episodes:</strong> {anime.episodes || 'TBA'}</p>
              <p><strong>Aired:</strong> {anime.aired?.string || 'N/A'}</p>
              {anime.genres && (
                <p>
                  <strong>Genres:</strong>{' '}
                  {anime.genres.map((genre) => (
                    <span key={genre.mal_id} className={styles.genre}>
                      {genre.name}
                    </span>
                  ))}
                </p>
              )}
            </motion.div>

            <motion.div className={styles.buttons} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {youtubeId && (
                <button
                  className={styles.btnPrimary}
                  onClick={() => setShowTrailer(true)}
                  title="Watch trailer"
                >
                  <FaPlay /> Watch Trailer
                </button>
              )}
              <button
                className={`${styles.btnSecondary} ${inWatchlist ? styles.inWatchlist : ''}`}
                onClick={handleWatchlistToggle}
                title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                {inWatchlist ? <FaTrash /> : <FaPlus />}
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div className={styles.synopsisSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2>Synopsis</h2>
          <p>{fullOverview ? anime.synopsis : anime.synopsis?.slice(0, 400)}</p>
          {anime.synopsis?.length > 400 && (
            <button
              className={styles.readMore}
              onClick={() => setFullOverview(!fullOverview)}
            >
              {fullOverview ? 'Show Less' : 'Read More'}
            </button>
          )}
        </motion.div>

        {news && news.length > 0 && (
          <motion.section className={styles.newsSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <h2>Latest News</h2>
            <div className={styles.newsList}>
              {news.map((newsItem) => (
                <motion.a
                  key={newsItem.mal_id}
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsCard}
                  whileHover={{ y: -5 }}
                >
                  {newsItem.images?.jpg?.image_url && (
                    <img src={newsItem.images.jpg.image_url} alt={newsItem.title} />
                  )}
                  <div className={styles.newsContent}>
                    <h4>{newsItem.title}</h4>
                    <p className={styles.newsDate}>
                      {new Date(newsItem.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}

        {recommendations && recommendations.length > 0 && (
          <motion.section className={styles.recommendedSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <h2>Recommended Anime</h2>
            <div className={styles.recommendedGrid}>
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.entry.mal_id}
                  className={styles.recommendedCard}
                  onClick={() => handleRecommendationClick(rec)}
                  whileHover={{ y: -8 }}
                >
                  <img
                    src={rec.entry.images?.jpg?.image_url}
                    alt={rec.entry.title}
                    loading="lazy"
                  />
                  <p>{rec.entry.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>

      <Modal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        title="Trailer"
        size="lg"
      >
        {youtubeId ? (
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Anime Trailer"
            style={{ borderRadius: '8px' }}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Trailer not available</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AnimeDetail;
