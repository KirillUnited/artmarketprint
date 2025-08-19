'use client';
import React, { useMemo, useState, useEffect } from 'react';
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
import { collectMaterials } from '@/lib/products/collectCategories';
import { MaterialFilter } from '@/components/ui/filter/MaterialFilter';
import { Product, ProductData } from './product.types';
import { ProductCardSkeleton } from './ProductGrid';
import { Any } from 'next-sanity';

const ITEMS_PER_PAGE = 20;

interface Category {
    id: string;
    name: string;
    count?: number;
    subcategories?: Category[];
}

interface ProductsViewProps {
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
        currentPage,
        filteredProducts,
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
                            selectedCategory={selectedCategory}
                            selectedMaterial={selectedMaterial}
                            sortOrder={sortOrder}
                            onFilterChange={handleFilterChange}
                        />
                    }
                    <div className='flex flex-col gap-4 md:gap-8 relative h-full'>
                        {!isLoading && (
                            <>
                                <div className='md:hidden'> 
                                    {SortFilter({ 
                                        sortOrder, 
                                        selectedCategory, 
                                        onFilterChange: (sort: string, cat: string) => handleFilterChange(sort, cat) 
                                    })}
                                </div>
                                <div className='md:hidden'> 
                                    {MaterialFilter({ 
                                        selectedMaterial, 
                                        selectedCategory,
                                        sortOrder, 
                                        materials, 
                                        onFilterChange: (sort, cat, mat) => handleFilterChange(sort, cat, mat) 
                                    })}
                                </div>

                                {
                                    showFilter &&
                                    <div className='flex md:hidden flex-wrap flex-col md:flex-row gap-4 w-full mb-4'>
                                        <FilterButton onOpen={onOpen} />
                                        <FilterDrawer
                                            isOpen={isOpen}
                                            onOpenChange={onOpenChange}
                                            onFilterChange={handleFilterChange}
                                            categories={enrichedCategories}
                                            materials={materials}
                                            sortOrder={sortOrder}
                                            selectedCategory={selectedCategory}
                                            selectedMaterial={selectedMaterial}
                                        />
                                    </div>
                                }
                                {
                                    selectedCategory && 
                                    <Chip 
                                        color='primary' 
                                        radius='sm' 
                                        classNames={{
                                            base: '',
                                            content: 'flex items-center gap-2'
                                        }}
                                    >
                                        {selectedCategory} 
                                        <DeleteIcon 
                                            className='cursor-pointer' 
                                            onClick={() => handleFilterChange(sortOrder, '')} 
                                        />
                                    </Chip>
                                }
                            </>
                        )}

                        {isLoading ? (
                            renderSkeletons()
                        ) : paginatedItems.length ? (
                            <ProductGrid products={paginatedItems} />
                        ) : (
                            <ProductsNotFound />
                        )}
                        
                        {!isLoading && filteredProducts.length > totalItemsView && (
                            <Pagination
                                className='self-center'
                                page={currentPage}
                                total={totalPages}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

