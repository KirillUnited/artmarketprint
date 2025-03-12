'use client';
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import ProductThumb from './ProductThumb';
import ProductsFilter, { getCategory } from './ProductsFilter'

import Pagination from '@/components/ui/Pagination'
import ProductSearchForm from './ProductSearchForm';

const ITEMS_PER_PAGE = 8;

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE }: any) {
    const [sortOrder, setSortOrder] = React.useState('asc');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const handleFilterChange = (newSortOrder: string, newCategory: string) => {
        setSortOrder(newSortOrder);
        setSelectedCategory(newCategory);
    };
    const filteredProducts = (selectedCategory ? products
        .filter((product: any) => getCategory(product?.category) === selectedCategory) : products ?? [])
        .sort((a: any, b: any) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    const paginatedItems = filteredProducts.slice(
        (currentPage - 1) * totalItemsView,
        currentPage * totalItemsView
    );

    return (
        <div className='flex flex-col gap-8'>
            <div className='grid grid-cols-[auto_1fr] items-start gap-4 md:gap-8'>
                <ProductsFilter categories={categories}
                    selectedCategory={selectedCategory}
                    sortOrder={sortOrder}
                    onFilterChange={handleFilterChange} />
                <div className='flex flex-col gap-8'>
                    <ProductSearchForm />
                    <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
                        {paginatedItems?.map((item: any) => (
                            <AnimatePresence key={`${item?.id['#text']}`}>
                                <motion.li
                                    key={`${item?.id['#text']}`}
                                    layout
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    initial={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                >
                                    <ProductThumb item={item} />
                                </motion.li>
                            </AnimatePresence>
                        ))}
                    </ul>
                </div>
            </div>
            {
                filteredProducts.length > totalItemsView &&
                <Pagination className='self-center'
                    total={Math.ceil(filteredProducts.length / totalItemsView)}
                    onChange={(value) => setCurrentPage(value)} />
            }
        </div>
    )
}
