import { Product, ProductData } from '@/types/product.types';
import { getPrice } from '@/lib/getPrice';

// Product helper functions
export const extractProductData = (product: Product): ProductData => ({
    id: product.id[0]._,
    name: product.product[0]._,
    price: parseFloat(getPrice(product.price[0], 1.1)),
    image: product.images_urls[0]?.split(',')[0],
    description: product.general_description[0],
    category: product.category[0].split('|')[0],
    quantity: 1
});