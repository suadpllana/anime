import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../hooks/useHelpers';
import { useThemeStore } from '../store/store';
import { FaHome, FaList, FaMoon, FaSun } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const { watchlistCount } = useWatchlist();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          className={styles.logo}
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <FaHome size={24} />
          <span>AnimeHub</span>
        </button>

        <nav className={styles.nav}>
          <a href="#/genre/home?type=movie" className={styles.navLink}>
            Movies
          </a>
          <a href="#/genre/home?type=tv" className={styles.navLink}>
            TV Series
          </a>
          <a href="#/genre/home?filter=airing" className={styles.navLink}>
            Trending
          </a>
          <a href="#/genre/home?filter=upcoming" className={styles.navLink}>
            Upcoming
          </a>
           <button
            className={styles.watchlistButton}
            onClick={() => navigate('/watchlist')}
            title="Watchlist"
          >
            <FaList />
            {watchlistCount > 0 && <span className={styles.badge}>{watchlistCount}</span>}
          </button>
        </nav>

      
      </div>
    </header>
  );
};

export default Header;
