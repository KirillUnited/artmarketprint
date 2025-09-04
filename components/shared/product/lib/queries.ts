// lib/queries.ts
import {defineQuery} from 'next-sanity';

export const getProductsQuery = (
	category: any | null,
	subcategory: any | null,
	page: number,
	limit: number,
	sort: string | null,
	material: string | null
) => {
	const start = (page - 1) * limit;
	const categoryFilter = category ? `&& category == "${category.title}"` : '';
	const subcategoryFilter = subcategory ? `&& subcategory == "${subcategory.title}"` : '';
	const materialFilter = material ? `&& "${material}" in materials` : ""

	let order = "order(_createdAt desc)"
	if (sort === "price-asc") order = "order(price asc)"
	if (sort === "price-desc") order = "order(price desc)"

	return `
    *[_type == "product" ${categoryFilter} ${subcategoryFilter} ${materialFilter}] | ${order} [${start}...${start + limit}] {
      _id,
      id,
      name,
      price,
      "slug": slug.current,
      image,
      category,
      subcategory,
      brand,
      items,
      materials
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
	  "currentSlug": slug.current,
    subcategories[] {
      _key,
      id,
      title,
      "slug": slug.current
    }
  }
`);

export const getAllProductMaterials = `
  array::unique(*[_type == "product"].materials[]) | order(@ asc)
`;

export const getTotalProductsQuery = (category: any | null, subcategory: any | null, material: string | null) => {
	const categoryFilter = category ? `&& category == "${category.title}"` : '';
	const subcategoryFilter = subcategory ? `&& subcategory == "${subcategory.title}"` : '';
	const materialFilter = material ? `&& "${material}" in materials` : ""

	return `count(*[_type == "product" ${categoryFilter} ${subcategoryFilter} ${materialFilter}])`;
};
