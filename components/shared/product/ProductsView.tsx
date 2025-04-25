'use client';
import React from 'react'
import ProductsFilter, { FilterButton, FilterDrawer } from './ProductsFilter'
import Pagination from '@/components/ui/Pagination'
import ProductSearchForm from './ProductSearchForm';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';
import ProductGrid from './ProductGrid';
import { Chip } from '@heroui/chip';
import { DeleteIcon } from 'lucide-react';
import { SortFilter } from '@/components/ui/filter/SortFilter';
import { useProductsFilter } from '@/hooks/useProductsFilter';

const ITEMS_PER_PAGE = 20;

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, showFilter = true }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        sortOrder,
        selectedCategory,
        currentPage,
        filteredProducts,
        paginatedItems,
        totalPages,
        handleFilterChange,
        handlePageChange
    } = useProductsFilter({ products, totalItemsView });

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

