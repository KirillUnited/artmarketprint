import { useMemo, useState } from 'react';

import { scrollTo } from '@/lib/scrollTo';

interface UseProductsFilterProps {
    products: any[];
    totalItemsView?: number;
}

interface UseProductsFilterReturn {
    sortOrder: string;
    selectedCategory: string;
    selectedMaterial: string;
    selectedImageColor: string;
    currentPage: number;
    filteredProducts: any[];
    paginatedItems: any[];
    totalPages: number;
    handleFilterChange: (newSortOrder: string, newCategory: string, newMaterial?: string, newImageColor?: string) => void;
    handlePageChange: (newPage: number) => void;
}

export function useProductsFilter({ products, totalItemsView = 20 }: UseProductsFilterProps): UseProductsFilterReturn {
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedImageColor, setSelectedImageColor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Memoized filtered and sorted products
    const filteredProducts = useMemo(() => {
        const result = products?.filter((product: any) => {
            const categoryMatch = !selectedCategory || 
                (product?.category === selectedCategory || 
                product?.subcategory?.includes(selectedCategory));
            
            const materialMatch = !selectedMaterial || 
                (product?.materials && 
                product.materials.includes(selectedMaterial));

            const imageColorMatch = !selectedImageColor || (() => {
                if (!product.imagePalette) return false;
                const palette = product.imagePalette;
                const colors = Object.values(palette)
                    .filter((c: any) => c && c.background)
                    .map((c: any) => c.background.toUpperCase());
                return colors.includes(selectedImageColor.toUpperCase());
            })();
            
            return categoryMatch && materialMatch && imageColorMatch;
        }) || [];

        return sortOrder === 'asc'
            ? result.sort((a: any, b: any) => a.price - b.price)
            : result.sort((a: any, b: any) => b.price - a.price);
    }, [products, selectedCategory, selectedMaterial, sortOrder]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / totalItemsView);
    const paginatedItems = filteredProducts.slice(
        (currentPage - 1) * totalItemsView,
        currentPage * totalItemsView
    );

    // Handler for filter changes
    const handleFilterChange = (newSortOrder: string, newCategory: string, newMaterial?: string, newImageColor?: string) => {
        setSortOrder(newSortOrder);
        
        if (newCategory !== undefined) {
            setSelectedCategory(newCategory);
        }
        
        if (newMaterial !== undefined) {
            setSelectedMaterial(newMaterial);
        }

        if (newImageColor !== undefined) {
            setSelectedImageColor(newImageColor);
        }
        
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
        selectedMaterial,
        selectedImageColor,
        currentPage,
        filteredProducts,
        paginatedItems,
        totalPages,
        handleFilterChange,
        handlePageChange
    };
}