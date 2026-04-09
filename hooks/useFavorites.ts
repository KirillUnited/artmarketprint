'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FavoriteItem } from '@/types/favorites';

interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem['product']) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  loading: boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const persistFavorites = (items: FavoriteItem[]) => {
    localStorage.setItem('favorites', JSON.stringify(items));
    // Notify other hook instances in the same tab
    window.dispatchEvent(new Event('favorites:changed'));
  };

  const readLocalFavorites = (): FavoriteItem[] => {
    const storedFavorites = localStorage.getItem('favorites');
    if (!storedFavorites) return [];

    try {
      const parsed = JSON.parse(storedFavorites);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item): item is FavoriteItem => !!item?.productId && !!item?.product);
    } catch (e) {
      console.error('Error parsing stored favorites:', e);
      return [];
    }
  };

  // Load favorites from localStorage first and optionally hydrate from API
  useEffect(() => {
    const localFavorites = readLocalFavorites();
    setFavorites(localFavorites);

    const hydrateFromApi = async () => {
      try {
        const response = await fetch('/api/favorites', { cache: 'no-store' });
        if (!response.ok) return;

        const { favorites: fetchedFavorites } = await response.json();
        if (!Array.isArray(fetchedFavorites) || fetchedFavorites.length === 0) return;

        // API currently may return items without product payload.
        const normalized = fetchedFavorites.filter(
          (item: any): item is FavoriteItem => !!item?.productId && !!item?.product
        );
        if (normalized.length === 0) return;

        setFavorites(normalized);
        persistFavorites(normalized);
      } catch (error) {
        console.error('Error loading favorites from API:', error);
      } finally {
        setLoading(false);
      }
    };

    hydrateFromApi();

    const syncFavorites = () => {
      setFavorites(readLocalFavorites());
    };

    window.addEventListener('storage', syncFavorites);
    window.addEventListener('favorites:changed', syncFavorites);

    return () => {
      window.removeEventListener('storage', syncFavorites);
      window.removeEventListener('favorites:changed', syncFavorites);
    };
  }, []);

  const addToFavorites = async (product: FavoriteItem['product']) => {
    const newFavorite: FavoriteItem = { productId: product.id, product };
    let isNewFavorite = false;

    // Optimistic local update so all UI stays in sync.
    setFavorites((prev) => {
      if (prev.some((fav) => fav.productId === product.id)) {
        return prev;
      }
      isNewFavorite = true;
      const updated = [...prev, newFavorite];
      persistFavorites(updated);
      return updated;
    });

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id, product }),
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // local state is already updated; we keep it as source of truth
      toast.error('Не удалось синхронизировать избранное с сервером');
    }

    if (isNewFavorite) {
      toast.success('Товар добавлен в избранное');
    }
  };

  const removeFromFavorites = async (productId: string) => {
    const favoriteItem = favorites.find((fav) => fav.productId === productId);
    let removed = false;

    // Optimistic local update so all UI stays in sync.
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav.productId !== productId);
      removed = updated.length !== prev.length;
      persistFavorites(updated);
      return updated;
    });

    try {
      await fetch(`/api/favorites/${productId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      // local state is already updated; we keep it as source of truth
      toast.error('Не удалось синхронизировать избранное с сервером');
    }

    if (removed) {
      toast.info('Товар удален из избранного');
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.some(fav => fav.productId === productId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loading,
  };
}