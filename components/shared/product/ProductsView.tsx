'use client';
import React, { useMemo } from 'react';
import ProductsFilter, { FilterButton, FilterDrawer } from './ProductsFilter';
import Pagination from '@/components/ui/Pagination';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';
import ProductGrid from './ProductGrid';
import { Chip } from '@heroui/chip';
import { DeleteIcon } from 'lucide-react';
import { SortFilter } from '@/components/ui/filter/SortFilter';
import { useProductsFilter } from '@/hooks/useProductsFilter';
import { ProductsNotFound } from './ProductsNotFound';
import { countProductsByCategory, enrichCategoriesWithCounts } from '@/lib/products/categoryCounts';

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

    // Calculate product counts by category and subcategory
    const categoryCounts = useMemo(() => {
        return countProductsByCategory(products);
    }, [products]);

    // Enrich categories with their product counts
    const enrichedCategories = useMemo(() => {
        return enrichCategoriesWithCounts(categories, categoryCounts);
    }, [categories, categoryCounts]);

    return (
        <>
            {
                <div className='flex flex-col gap-8'>
                    <div className={clsx(
                        'grid items-start gap-4 md:gap-8', {
                        ['md:grid-cols-[320px_1fr]']: showFilter
                    }
                    )}>
                        {
                            showFilter &&
                            <ProductsFilter 
                                categories={enrichedCategories}
                                selectedCategory={selectedCategory}
                                sortOrder={sortOrder}
                                onFilterChange={handleFilterChange} 
                            />
                        }
                        <div className='flex flex-col gap-4 md:gap-8 relative h-full'>

                            <div className='md:hidden'> {SortFilter({ sortOrder, selectedCategory, onFilterChange: handleFilterChange })}</div>
                            {
                                showFilter &&
                                <div className='flex md:hidden flex-wrap flex-col md:flex-row gap-4 w-full'>
                                    <FilterButton onOpen={onOpen} />
                                    <FilterDrawer isOpen={isOpen} onOpenChange={onOpenChange} onFilterChange={handleFilterChange} categories={enrichedCategories} sortOrder={sortOrder} selectedCategory={selectedCategory} />
                                </div>
                            }
                            {
                                selectedCategory && <Chip color='primary' radius='sm' classNames={{
                                    base: '',
                                    content: 'flex items-center gap-2'
                                }}>{selectedCategory} <DeleteIcon className='cursor-pointer' onClick={() => handleFilterChange(sortOrder, '')} /></Chip>
                            }
                            {
                                paginatedItems.length ?
                                    <ProductGrid products={paginatedItems} /> :
                                    <ProductsNotFound />
                            }
                            {
                                filteredProducts.length > totalItemsView && (
									<Pagination
										className='self-center'
										page={currentPage}
										total={totalPages}
										onChange={handlePageChange}
									/>
								)
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

