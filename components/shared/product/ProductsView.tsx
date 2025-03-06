// 'use client';
import React from 'react'
import ProductsFilter from './ProductsFilter'
import ProductList from './ProductList'
import Pagination from '@/components/ui/Pagination'

export default function ProductsView({ products, categories }: any) {
    return (
        <div className='flex flex-col gap-8'>
            <ProductsFilter categories={categories} />
            <ProductList items={products} />
            <Pagination total={10} className='self-center' />
        </div>
    )
}
