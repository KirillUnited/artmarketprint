import { Product, ProductData } from '@/components/shared/product/product.types';
import { getPrice } from '@/lib/getPrice';

// Product helper functions
export const extractProductData = (product: Product): ProductData => ({
    _id: product?.id[0]?._ || '',
    id: product.id[0]._,
    name: product.product[0]._,
    price: parseFloat(getPrice(product.price[0], 1.1)),
    image: product.images_urls[0]?.split(',')[0],
    images_urls: product.images_urls?.[0],
    description: product.general_description[0],
    variation_description: product.variation_description?.[0],
    category: product.category[0].split('|')[0],
    quantity: 1
});