import type { Favorite } from '@/types/favorites';

/** In-memory storage for guest users (placeholder until a real persistence layer exists). */
export const guestFavorites: Record<string, Favorite[]> = {};
