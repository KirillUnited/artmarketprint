'use client';

import ProductThumb from './ui/ProductThumb';

import { Carousel } from '@/components/shared/carousel/Carousel';

export default function RelatedProductsCarousel({ relatedProducts }: any) {
    return <Carousel items={relatedProducts} renderProps={(item: any) => <ProductThumb item={item} />} />;
}
