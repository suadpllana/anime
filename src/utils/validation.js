import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').min(2, 'Search query must be at least 2 characters'),
});

export const validateSearch = (query) => {
  try {
    searchSchema.parse({ query });
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.errors[0]?.message || 'Invalid search' };
  }
};

export const animeSchema = z.object({
  mal_id: z.number(),
  title_english: z.string().optional(),
  title_japanese: z.string().optional(),
  title: z.string(),
  synopsis: z.string().optional(),
  score: z.number().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  images: z.object({
    jpg: z.object({
      large_image_url: z.string().optional(),
      small_image_url: z.string().optional(),
      image_url: z.string().optional(),
    }).optional(),
  }).optional(),
});

export const validateAnime = (data) => {
  try {
    animeSchema.parse(data);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.errors[0]?.message || 'Invalid anime data' };
  }
};
