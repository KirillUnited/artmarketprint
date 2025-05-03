import React from 'react'

import RelatedProductsCarousel from './RelatedProductsCarousel';

import Section from '@/components/layout/Section';
import { getRelatedProductsByCategory } from '@/lib/actions/product.actions';

export default async function RelatedProducts({ product }: any) {
    const relatedProducts = await getRelatedProductsByCategory(product?.category, product?.id);

    if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) return null;

    return (
        <Section className="bg-gray-100 relative">
            <div className="flex flex-col gap-4 overflow-hidden">
                <h2 className="text-2xl font-semibold">Похожие товары</h2>
                <RelatedProductsCarousel relatedProducts={relatedProducts} />
            </div>
        </Section>
    )
}
