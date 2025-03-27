'use client';
import React, { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import ProductThumb from './ProductThumb';
import ProductsFilter, { FilterButton, FilterDrawer, getCategory } from './ProductsFilter'

import Pagination from '@/components/ui/Pagination'
import ProductSearchForm from './ProductSearchForm';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';
import Loader from '@/components/ui/Loader';
import { scrollTo } from '@/lib/scrollTo';
import { BrandCard } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/button';

const ITEMS_PER_PAGE = 20;

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, isSearchPage = false }: any) {
    const [sortOrder, setSortOrder] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log('Products View page loaded');
    }, []);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory) {
            result = result.filter((product: any) => getCategory(product?.category) === selectedCategory);
        }

        return sortOrder === 'asc'
            ? [...result].sort((a: any, b: any) => a.price - b.price)
            : [...result].sort((a: any, b: any) => b.price - a.price);
    }, [products, selectedCategory, sortOrder]);
    const totalPages = Math.ceil(filteredProducts.length / totalItemsView);
    const paginatedItems = filteredProducts.slice(
        (currentPage - 1) * totalItemsView,
        currentPage * totalItemsView
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
        {`${paginatedItems}`}
            {/* {
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
                                <ul>
                                {
                                    paginatedItems.map((item: any) => (
                                        <li key={`${item?.id[0]['_']}`}>
                                            <div
                                                className={clsx(
                                                    "h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow"
                                                )}
                                            >
                                                <div className='items-stretch'>
                                                    <Image alt={item.product[0]['_']} className="object-contain aspect-square mx-auto" src={item.images_urls[0]?.split(',')[0]} width={220} height={220}
                                                        quality={50}
                                                    />
                                                    <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${item.price} BYN`}</span>
                                                    <h3 className="font-bold text-gray-900 line-clamp-2">{item.product[0]['_']}</h3>
                                                    <p className="text-gray-600 line-clamp-2 text-xs">{item.general_description[0]}</p>
                                                </div>
                                                <div>
                                                    <Button as={Link} color='secondary' href={`/products/${item.id[0]['_']}`} radius='sm' size="md" target='_blank'>Подробнее</Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul> :
                                    <p className="text-center mt-8 text-gray-500">Нет товаров</p>}
                            {
                                filteredProducts.length > totalItemsView &&
                                <Pagination className='self-center'
                                    total={totalPages}
                                    onChange={handlePageChange} page={currentPage} />
                            }
                        </div>
                    </div>
                </div>
            } */}
        </>
    )
}

