'use client';
import React, { useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDisclosure } from '@heroui/modal';

import Pagination from '@/components/ui/Pagination';
import { SortFilter } from '@/components/ui/filter/SortFilter';
import { useProductsFilter } from '@/hooks/useProductsFilter';
import { countProductsByCategory, enrichCategoriesWithCounts } from '@/lib/products/categoryCounts';
import { collectMaterials } from '@/lib/products/collectCategories';

import { ProductList } from './ui';
import ProductsFilter, {FilterButton, FilterDrawer } from './ProductsFilter';
import { Product } from './product.types';
import { ProductCardSkeleton } from './ProductGrid';

const ITEMS_PER_PAGE = 20;

interface Category {
    id: string;
    name: string;
    count?: number;
    subcategories?: Category[];
}

export interface ProductsViewProps {
    products: Product[];
    categories: any[];
    totalItemsView?: number;
    showFilter?: boolean;
}

export default function ProductsView({ products, categories, totalItemsView = ITEMS_PER_PAGE, showFilter = true }: ProductsViewProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);

    const {
        sortOrder,
        selectedCategory,
        selectedMaterial,
        selectedImageColor,
        currentPage,
        paginatedItems,
        totalPages,
        handleFilterChange,
        handlePageChange
    } = useProductsFilter({ products, totalItemsView });

    // Simulate loading state for better UX
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Calculate product counts by category and subcategory
    const categoryCounts = useMemo(() => {
        return countProductsByCategory(products);
    }, [products]);

    // Enrich categories with their product counts
    const enrichedCategories = useMemo(() => {
        return enrichCategoriesWithCounts(categories, categoryCounts);
    }, [categories, categoryCounts]);
    // Collect materials
    const materials = useMemo(() => collectMaterials(products), [products]);

    // Function to render skeleton loaders during loading state
    const renderSkeletons = () => {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-40 animate-pulse">
                {Array(8).fill(0).map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
        );
    };

    return (
        <>
            <div className='flex flex-col gap-8'>
                <div className={clsx(
                    'grid items-start gap-4 md:gap-8 grid-cols-1', {
                    ['md:grid-cols-[320px_1fr]']: showFilter && !isLoading,
                    ['md:grid-cols-1']: !showFilter || isLoading
                }
                )}>
                    {
                        showFilter && !isLoading &&
                        <ProductsFilter
                            categories={enrichedCategories}
                            materials={materials}
                            products={products}
                            selectedCategory={selectedCategory}
                            selectedImageColor={selectedImageColor}
                            selectedMaterial={selectedMaterial}
                            sortOrder={sortOrder}
                            onFilterChange={handleFilterChange}
                        />
                    }

                    <div className='flex flex-col gap-8'>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-2 w-full">
                                {
                                    showFilter && !isLoading &&
                                    <FilterButton onOpen={onOpen} />
                                }
                                <div className="grow md:hidden">
                                    <SortFilter selectedCategory={selectedCategory} sortOrder={sortOrder} onFilterChange={handleFilterChange} />
                                </div>
                            </div>
                        </div>

                        {isLoading ? renderSkeletons() : (
                            <>
                                {paginatedItems.length > 0 ? (
                                    <ProductList products={paginatedItems} />
                                ) : (
                                    null
                                )}

                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <Pagination
                                            page={currentPage}
                                            total={totalPages}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <FilterDrawer
                        categories={enrichedCategories}
                        isOpen={isOpen}
                        materials={materials}
                        products={products}
                        selectedCategory={selectedCategory}
                        selectedImageColor={selectedImageColor}
                        selectedMaterial={selectedMaterial}
                        sortOrder={sortOrder}
                        onFilterChange={handleFilterChange}
                        onOpenChange={onOpenChange}
                    />
                </div>
            </div>
        </>
    )
}

