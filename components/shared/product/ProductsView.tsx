'use client';
import React from 'react'
import ProductsFilter from './ProductsFilter'
import ProductList from './ProductList'
import Pagination from '@/components/ui/Pagination'
import RelatedProductsCarousel from './RelatedProductsCarousel'

export default function ProductsView({ products, categories }: any) {
    const [filteredItems, setFilteredItems] = React.useState(products);
    const [sortedItems, setSortedItems] = React.useState(products);
    return (
        <div className='flex flex-col gap-8'>
            <ProductsFilter categories={categories} products={products} sortedProducts={setSortedItems} />
            {/* <ProductList items={products} /> */}
            <RelatedProductsCarousel relatedProducts={sortedItems} />
            <Pagination total={10} className='self-center' />
        </div>
    )
}
