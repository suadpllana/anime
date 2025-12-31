export const formatSearchTerm = (term) => {
  return term.trim().toLowerCase().replace(/\s+/g, '-');
};

export const unformatSearchTerm = (term) => {
  return term.replace(/-/g, ' ');
};

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

export const getDisplayTitle = (anime) => {
  return anime?.title_english || anime?.title_japanese || anime?.title || 'Unknown';
};

export const formatDuration = (duration) => {
  if (!duration) return 'N/A';
  // Example: "24 min per ep" -> "24 min"
  return duration.split(' per')[0];
};

export const formatScore = (score) => {
  if (!score || score === 0) return 'N/A';
  return score.toFixed(1);
};

export const truncateText = (text, maxLength = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const isAnimeEqual = (anime1, anime2) => {
  return anime1?.mal_id === anime2?.mal_id;
};

export const getCurrentSeason = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  let season = 'winter';
  if (month >= 2 && month < 5) season = 'spring';
  else if (month >= 5 && month < 8) season = 'summer';
  else if (month >= 8 && month < 11) season = 'fall';
  
  return { season, year };
};
