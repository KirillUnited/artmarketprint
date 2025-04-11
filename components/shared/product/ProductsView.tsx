'use client';
import React, { Suspense } from 'react'
import ProductsFilter, { FilterButton, FilterDrawer, getCategory } from './ProductsFilter'
import Pagination from '@/components/ui/Pagination'
import ProductSearchForm from './ProductSearchForm';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';
import Loader from '@/components/ui/Loader';
import { scrollTo } from '@/lib/scrollTo';

const ITEMS_PER_PAGE = 20;

import ProductGrid from './ProductGrid';
import { Chip } from '@heroui/chip';
import { DeleteIcon } from 'lucide-react';
import { SortFilter } from '@/components/ui/filter/SortFilter';

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, showFilter = true }: any) {
    const [sortOrder, setSortOrder] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const filteredProducts = React.useMemo(() => {
        const result = products?.filter((product: any) => !selectedCategory || product?.category === selectedCategory) || [];

        return sortOrder === 'asc'
            ? result.sort((a: any, b: any) => a.price - b.price)
            : result.sort((a: any, b: any) => b.price - a.price);
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
            {
                <div className='flex flex-col gap-8'>
                    <div className={clsx(
                        'grid items-start gap-4 md:gap-8', {
                        ['md:grid-cols-[auto_1fr]']: showFilter
                    }
                    )}>
                        {
                            showFilter &&
                            <ProductsFilter categories={categories}
                                selectedCategory={selectedCategory}
                                sortOrder={sortOrder}
                                onFilterChange={handleFilterChange} />
                        }
                        <div className='flex flex-col gap-8 relative'>

                           <div className='md:hidden'> {SortFilter({ sortOrder, selectedCategory, onFilterChange: handleFilterChange })}</div>
                            {
                                showFilter &&
                                <div className='flex flex-wrap flex-col md:flex-row gap-4 w-full'>
                                    <FilterButton onOpen={onOpen} />
                                    <FilterDrawer isOpen={isOpen} onOpenChange={onOpenChange} onFilterChange={handleFilterChange} categories={categories} sortOrder={sortOrder} selectedCategory={selectedCategory} />
                                    <ProductSearchForm />
                                </div>
                            }
                            {
                                selectedCategory && <Chip color='primary' radius='sm' classNames={{
                                    base: 'md:hidden',
                                    content: 'flex items-center gap-2'
                                }}>{selectedCategory} <DeleteIcon className='cursor-pointer' onClick={() => handleFilterChange(sortOrder, '')} /></Chip>
                            }
                            {
                                paginatedItems.length ?
                                    <ProductGrid products={paginatedItems} /> :
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
            }
        </>
    )
}

