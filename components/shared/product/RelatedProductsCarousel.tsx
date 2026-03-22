'use client';

import { Carousel } from '@/components/shared/carousel/Carousel';

import ProductThumb from './ui/ProductThumb';


export default function RelatedProductsCarousel({ relatedProducts }: any) {
    return <Carousel items={relatedProducts} renderProps={(item: any) => <ProductThumb item={item} />} />;
}
