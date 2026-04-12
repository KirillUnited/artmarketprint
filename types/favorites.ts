export interface Favorite {
  id: string;
  userId: string | null;
  productId: string;
  createdAt: Date;
}

export interface FavoriteItem {
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    category?: string;
  };
}