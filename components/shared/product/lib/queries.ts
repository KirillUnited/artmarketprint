// lib/queries.ts
import {defineQuery} from "next-sanity";

export const getProductsQuery = (category: any | null, subcategory: any | null, page: number, limit: number) => {
	const start = (page - 1) * limit;
	const categoryFilter = category ? `&& category == "${category.title}"` : '';
  const subcategoryFilter = subcategory ? `&& subcategory == "${subcategory.title}"` : ''

	return `
    *[_type == "product" ${categoryFilter} ${subcategoryFilter}] | order(_createdAt desc) [${start}...${start + limit}] {
      _id,
      id,
      name,
      price,
      "slug": slug.current,
      image,
      category,
      subcategory,
      brand,
      items
    }
  `;
};

export const getCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    id,
    title,
    featured,
    description,
    image, 
    price,
    "currentSlug": slug.current,
    subcategories[]{
      _key,
      id,
      title,
      "slug": slug.current
    }
  }
`;

export const CATEGORY_QUERY = defineQuery(`*[_type == "category" && slug.current == $slug][0] {
	  _id,
	  id,
	  title,
    subcategories[] {
      _key,
      id,
      title,
      "slug": slug.current
    }
  }
`);

export const getTotalProductsQuery = (category: any | null, subcategory: any | null) => {
	const categoryFilter = category ? `&& category == "${category.title}"` : '';
  const subcategoryFilter = subcategory ? `&& subcategory == "${subcategory.title}"` : ''
	return `count(*[_type == "product" ${categoryFilter} ${subcategoryFilter}])`;
};
