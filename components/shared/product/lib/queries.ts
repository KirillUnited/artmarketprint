// lib/queries.ts
export const getProductsQuery = (category: string | null, page: number, limit: number) => {
	const start = (page - 1) * limit;
	const categoryFilter = category ? `&& category->slug.current == "${category}"` : '';
	return `
    *[_type == "product" ${categoryFilter}] | order(_createdAt desc) [${start}...${start + limit}] {
      _id,
      id,
      name,
      price,
      "slug": slug.current,
      image,
      category,
      subcategory,
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
    "currentSlug": slug.current
  }
`;

export const getTotalProductsQuery = (category: string | null) => {
	const categoryFilter = category ? `&& category->slug.current == "${category}"` : '';
	return `count(*[_type == "product" ${categoryFilter}])`;
};
