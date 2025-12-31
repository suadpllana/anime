import React, { useEffect } from 'react';
import { useThemeStore } from '../store/store';

const ThemeProvider = ({ children }) => {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDark]);

  return children;
};

export default ThemeProvider;
