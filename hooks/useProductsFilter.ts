import { useMemo, useState } from 'react';
import { scrollTo } from '@/lib/scrollTo';

interface UseProductsFilterProps {
    products: any[];
    totalItemsView?: number;
}

interface UseProductsFilterReturn {
    sortOrder: string;
    selectedCategory: string;
    currentPage: number;
    filteredProducts: any[];
    paginatedItems: any[];
    totalPages: number;
    handleFilterChange: (newSortOrder: string, newCategory: string) => void;
    handlePageChange: (newPage: number) => void;
}

export function useProductsFilter({ products, totalItemsView = 20 }: UseProductsFilterProps): UseProductsFilterReturn {
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Memoized filtered and sorted products
    const filteredProducts = useMemo(() => {
        const result = products?.filter((product: any) => 
            !selectedCategory || product?.category === selectedCategory
        ) || [];

        return sortOrder === 'asc'
            ? result.sort((a: any, b: any) => a.price - b.price)
            : result.sort((a: any, b: any) => b.price - a.price);
    }, [products, selectedCategory, sortOrder]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / totalItemsView);
    const paginatedItems = filteredProducts.slice(
        (currentPage - 1) * totalItemsView,
        currentPage * totalItemsView
    );

    // Handler for filter changes
    const handleFilterChange = (newSortOrder: string, newCategory: string) => {
        setSortOrder(newSortOrder);
        setSelectedCategory(newCategory);
        setCurrentPage(1);
        scrollTo('products');
    };

    // Handler for page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        scrollTo('products');
    };

    return {
        sortOrder,
        selectedCategory,
        currentPage,
        filteredProducts,
        paginatedItems,
        totalPages,
        handleFilterChange,
        handlePageChange
    };
}