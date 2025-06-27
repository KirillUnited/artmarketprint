import { CategoryProps } from '@/components/ui/filter/CatFilter';

export interface CategoryCounts {
  [category: string]: {
    count: number;
    subcategories: {
      [subcategory: string]: number;
    };
  };
}

/**
 * Counts the number of products in each category and subcategory
 * @param products Array of product objects with category and subcategory properties
 * @returns An object with counts for each category and subcategory
 */
export function countProductsByCategory(products: any[]): CategoryCounts {
  const counts: CategoryCounts = {};

  products.forEach((product) => {
    const category = product.category?.trim();
    if (!category) return;

    // Initialize category if it doesn't exist
    if (!counts[category]) {
      counts[category] = {
        count: 0,
        subcategories: {},
      };
    }

    // Increment category count
    counts[category].count++;

    // Handle subcategories if they exist
    const subcategory = product.subcategory?.trim();
    if (subcategory) {
      // Initialize subcategory if it doesn't exist
      if (!counts[category].subcategories[subcategory]) {
        counts[category].subcategories[subcategory] = 0;
      }
      // Increment subcategory count
      counts[category].subcategories[subcategory]++;
    }
  });

  return counts;
}

/**
 * Enriches category data with product counts
 * @param categories Array of category objects from collectCategoriesAndSubcategories
 * @param counts Product counts from countProductsByCategory
 * @returns Enriched category data with counts
 */
export function enrichCategoriesWithCounts(
  categories: CategoryProps[],
  counts: CategoryCounts
): (CategoryProps & { count: number; subcategories: { name: string; count: number }[] })[] {
  return categories.map(({ category, subcategories = [] }) => ({
    category,
    count: counts[category]?.count || 0,
    subcategories: subcategories.map((subcategory) => ({
      name: subcategory,
      count: counts[category]?.subcategories[subcategory] || 0,
    })),
  }));
}
