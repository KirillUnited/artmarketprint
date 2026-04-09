'use client';

import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Heart, LucideIcon } from 'lucide-react';
import { cn } from '@heroui/react';
import { useFavorites } from '@/hooks/useFavorites';
import { HeartFilledIcon } from '@/components/icons';

interface FavoriteButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  productCategory?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  productId,
  productName,
  productPrice,
  productImage,
  productCategory,
  className,
  size = 'md'
}: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites, loading } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsFavorited(isFavorite(productId));
  }, [productId, isFavorite]);

  const handleClick = async () => {
    if (loading) return;

    setIsAnimating(true);

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      category: productCategory
    };

    if (isFavorited) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(product);
    }

    setIsFavorited(!isFavorited);

    // Reset animation after a delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  };

  return (
    <Button
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "rounded-full",
        sizeClasses[size],
        className
      )}
      isIconOnly
      size="sm"
      variant="light"
      onPress={handleClick}
    >
      <Heart
        className={cn(
          "transition-all duration-300",
          isFavorited ? "text-danger fill-current" : "text-default-400",
          isAnimating && "scale-125"
        )}
        size={iconSize[size]}
      />
    </Button>
  );
}