export function collectCategoriesAndSubcategories(products: any[]) {
    const map = new Map();

    products.forEach(product => {
        const category = product.category?.trim();
        const subcategory = product.subcategory?.trim();

        if (!category) return;

        if (!map.has(category)) {
            map.set(category, new Set());
        }

        if (subcategory) {
            map.get(category).add(subcategory);
        }
    });

    return Array.from(map.entries()).map(([category, subcategories]) => ({
        category,
        subcategories: Array.from(subcategories)
    }));
}
