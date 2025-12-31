import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { validateSearch } from '../utils/validation';
import { formatSearchTerm } from '../utils/helpers';
import { toast } from 'react-toastify';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, placeholder = 'Search anime...' }) => {
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = () => {
    const { valid, error } = validateSearch(search);
    if (!valid) {
      toast.warning(error);
      return;
    }
    onSearch(formatSearchTerm(search));
    setSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <motion.div
      className={`${styles.searchBar} ${isActive ? styles.active : ''}`}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search anime"
        className={styles.input}
      />
      {search && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
      <button
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </motion.div>
  );
};

export default SearchBar;
