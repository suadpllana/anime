import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ fullScreen = false, text = 'Loading...' }) => {
  const content = (
    <div className={styles.spinnerContainer}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
