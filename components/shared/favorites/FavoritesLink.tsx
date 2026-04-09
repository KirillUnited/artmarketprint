'use client';

import { useEffect, useState } from 'react';
import { Link } from '@heroui/link';
import { Tooltip } from '@heroui/tooltip';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export function FavoritesLink() {
  const { favorites, loading } = useFavorites();
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      setFavoritesCount(favorites.length);
    }
  }, [favorites, loading]);

  return (
    <Tooltip content="Избранное" placement="bottom">
      <Link
        aria-label={`Избранное${favoritesCount > 0 ? `, ${favoritesCount} товаров` : ''}`}
        className="relative"
        href="/favorites"
      >
        <Heart className="text-primary" size={24} />
        {favoritesCount > 0 && (
          <span className="bg-danger text-white rounded-full text-xs text-center px-1 py-1 truncate w-6 h-6 absolute -top-3 -right-3">
            {favoritesCount}
          </span>
        )}
      </Link>
    </Tooltip>
  );
}