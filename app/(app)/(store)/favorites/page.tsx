'use client';

import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { CURRENCIES_SYMBOLS } from '@/lib/products/companies';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, loading } = useFavorites();
  const isEmpty = !loading && favorites.length === 0;

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="container py-12">
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardBody className="items-center">
            <Heart className="text-default-300 mb-4" size={40} />
            <h2 className="text-2xl font-bold mb-2">Ваш список избранного пуст</h2>
            <p className="text-default-500 mb-6">
              Добавляйте товары в избранное, чтобы сохранить их на потом
            </p>
            <Button as={Link} color="primary" href="/products/categories/all">
              Перейти к товарам
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Мои избранные товары</h1>
        <p className="text-default-500">
          {favorites.length} {favorites.length === 1 ? 'товар' : 'товаров'} в вашем избранном
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((favorite) => (
          <Card key={favorite.productId} className="h-full">
            <CardBody className="items-stretch gap-4 p-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  alt={favorite.product.name}
                  className="object-contain mx-auto w-full h-48"
                  src={favorite.product.image || '/images/product-no-image.jpg'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/product-no-image.jpg';
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold line-clamp-2">{favorite.product.name}</h3>
                <p className="text-lg font-bold">
                  {favorite.product.price} {CURRENCIES_SYMBOLS['BYN'] || 'р'}
                </p>
              </div>
            </CardBody>
            <CardFooter className="flex justify-between items-center gap-2">
              <Button
                as={Link}
                className="flex-1"
                color="primary"
                href={`/products/${favorite.product.id}`}
                size="sm"
                variant="solid"
              >
                Посмотреть товар
              </Button>
              <Button
                isIconOnly
                aria-label="Удалить из избранного"
                size="sm"
                variant="light"
                onPress={() => removeFromFavorites(favorite.productId)}
              >
                <Trash2 size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}