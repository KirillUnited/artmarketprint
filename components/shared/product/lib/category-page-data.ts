import { cache } from "react";

import { getProductCategoriesQuery } from "@/components/shared/product/lib/queries";
import { resolveImageSrc } from "@/lib/image-utils";
import { sanityFetch } from "@/sanity/lib/sanityFetch";

export type ProductCategory = {
  title: string;
  currentSlug: string;
  image?: unknown;
};

export type Subcategory = {
  title: string;
  slug: string;
};

export type ProductCategorySource = {
  title?: string | null;
  image?: unknown;
};

export const encodeUrlSegment = (value: string) => encodeURIComponent(value);

export const decodeUrlSegment = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const toProductCategory = (title: string, image?: unknown): ProductCategory => ({
  title,
  currentSlug: encodeUrlSegment(title),
  image,
});

export const toSubcategory = (title: string): Subcategory => ({
  title,
  slug: encodeUrlSegment(title),
});

export const toUniqueProductCategories = (
  sourceCategories: ProductCategorySource[] = [],
): ProductCategory[] => {
  const categories = new Map<string, ProductCategory>();

  sourceCategories.forEach((category) => {
    const title = category.title?.trim();

    if (title && !categories.has(title)) {
      categories.set(title, toProductCategory(title, category.image));
    }
  });

  return Array.from(categories.values());
};

export const getCachedProductCategorySources = cache(async () =>
  sanityFetch({ query: getProductCategoriesQuery }) as Promise<ProductCategorySource[]>,
);

export const getActiveCategoryImageUrl = (
  categories: ProductCategory[],
  activeCategoryTitle: string | null,
) => {
  if (!activeCategoryTitle) return undefined;

  const activeCategory = categories.find((category) => category.title === activeCategoryTitle);
  if (!activeCategory?.image) return undefined;

  const resolved = resolveImageSrc(activeCategory.image, "");
  return resolved || undefined;
};
