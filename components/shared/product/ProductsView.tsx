'use client';
import React, { useEffect, useMemo } from 'react'
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

import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/lib/actions/product.actions';

// React Query hook for products
const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        gcTime: 30 * 60 * 1000, // Cache data for 30 minutes
    });
};


export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, isSearchPage = false }: any) {
    const { data, isLoading, error }: { data: any; isLoading: boolean; error: Error | null } = useProducts();
    const [sortOrder, setSortOrder] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isMounted, setIsMounted] = React.useState(false);

    if (isLoading) {
        return <Loader />;
    }

    const filteredProducts = () => {
        let result = data || [];

        if (selectedCategory) {
            result = result.filter((product: any) => getCategory(product?.category) === selectedCategory);
        }

        return sortOrder === 'asc'
            ? [...result].sort((a: any, b: any) => a.price - b.price)
            : [...result].sort((a: any, b: any) => b.price - a.price);
    };
    const totalPages = Math.ceil(filteredProducts().length / totalItemsView);
    const paginatedItems = filteredProducts().slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const handleFilterChange = (newSortOrder: string, newCategory: string) => {
        setSortOrder(newSortOrder);
        setSelectedCategory(newCategory);
        setCurrentPage(1);
        scrollTo('products');
    };
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        scrollTo('products');
    };

    return (
        <>
            {
                isLoading ? <Loader /> : <div className='flex flex-col gap-8'>
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
                                    <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
                                        <AnimatePresence>
                                            {
                                                paginatedItems?.map((item: any) => (
                                                    <motion.li
                                                        key={`${item?.id[0]['_']}`}
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
                                                ))
                                            }
                                        </AnimatePresence>
                                    </ul> :
                                    <p className="text-center mt-8 text-gray-500">Нет товаров</p>}
                            {
                                filteredProducts().length > totalItemsView &&
                                <Pagination className='self-center'
                                    total={totalPages}
                                    onChange={handlePageChange} page={currentPage} />
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

