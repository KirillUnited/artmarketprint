'use client';
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import ProductThumb from './ProductThumb';
import ProductsFilter, { FilterButton, FilterDrawer, getCategory } from './ProductsFilter'

import Pagination from '@/components/ui/Pagination'
import ProductSearchForm from './ProductSearchForm';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';
import Loader from '@/components/ui/Loader';
import { scrollTo } from '@/lib/scrollTo';

const ITEMS_PER_PAGE = 20;

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, isSearchPage = false }: any) {
    const [sortOrder, setSortOrder] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [filteredProducts, setFilteredProducts] = React.useState<any[]>([]);
    const [paginatedItems, setPaginatedItems] = React.useState<any[]>([]);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const filtered = selectedCategory ? products
            .filter((product: any) => getCategory(product?.category) === selectedCategory) : products ?? [];

        const sorted = filtered.sort((a: any, b: any) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

        setFilteredProducts(sorted);
        setPaginatedItems(sorted.slice(0, totalItemsView));
    }, [products, selectedCategory, sortOrder]);

    const handleFilterChange = (newSortOrder: string, newCategory: string) => {
        setSortOrder(newSortOrder);
        setSelectedCategory(newCategory);
        setCurrentPage(1);
        scrollTo('products');
    };

    const handlePageChange = (newPage: number) => {
        setPaginatedItems(filteredProducts.slice(
            (newPage - 1) * totalItemsView,
            newPage * totalItemsView
        ));
        setCurrentPage(newPage);
        scrollTo('products');
    };

    return (
        <>
            {
                !isMounted ? <Loader /> : <div className='flex flex-col gap-8'>
                    <div className={clsx(
                        'grid items-start gap-4 md:gap-8', {
                        ['md:grid-cols-[auto_1fr]']: !isSearchPage
                    }
                    )}>
                        {
                            !isSearchPage &&
                            <ProductsFilter categories={categories}
                                selectedCategory={selectedCategory}
                                sortOrder={sortOrder}
                                onFilterChange={handleFilterChange} />
                        }
                        <div className='flex flex-col gap-8'>
                            {
                                !isSearchPage &&
                                <div className='flex flex-wrap flex-col md:flex-row gap-4 w-full'>
                                    <FilterButton onOpen={onOpen} />
                                    <FilterDrawer isOpen={isOpen} onOpenChange={onOpenChange} onFilterChange={handleFilterChange} categories={categories} sortOrder={sortOrder} selectedCategory={selectedCategory} />
                                    <ProductSearchForm />
                                </div>
                            }
                            {
                                paginatedItems.length ?
                                    <ul className="grid grid-cols-[var(--grid-template-columns)] gap-4 md:gap-8">
                                        {
                                            paginatedItems?.map((item: any) => (
                                                <AnimatePresence key={`${item?.id[0]['_']}`}>
                                                    <motion.li
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
                                            ))
                                        }
                                    </ul> :
                                    <p className="text-center mt-8 text-gray-500">Нет товаров</p>}
                            {
                                filteredProducts.length > totalItemsView &&
                                <Pagination className='self-center'
                                    total={Math.ceil(filteredProducts.length / totalItemsView)}
                                    onChange={handlePageChange} page={currentPage} />
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

