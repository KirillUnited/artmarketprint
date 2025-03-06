import Section from '@/components/layout/Section';
import { getProductsByCategory } from '@/lib/actions/product.actions';
import React from 'react'
import RelatedProductsCarousel from './RelatedProductsCarousel';

export default async function RelatedProducts({ product }: any) {
    const relatedProducts = await getProductsByCategory(product?.category);

    return (
        <Section className="bg-gray-100">
            <div className="flex flex-col gap-4 overflow-hidden">
                <h2 className="text-2xl font-semibold">Похожие товары</h2>
                <RelatedProductsCarousel relatedProducts={relatedProducts} />
            </div>
        </Section>
    )
}
