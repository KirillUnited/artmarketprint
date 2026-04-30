// lib/queries.ts
import { defineQuery } from 'next-sanity';

export const getProductsQuery = (category: any | null, subcategories: any[] | null, page: number, limit: number, sort: string | null, material: string | null, color: string | null) => {
  const start = (page - 1) * limit;
  const categoryFilter = category ? `&& category == "${category.title}"` : '';
  const subcategoryFilter = subcategories && subcategories.length > 0 ? `&& subcategory in [${subcategories.map((subcategory: any) => `"${subcategory.title}"`).join(', ')}]` : '';
  const materialFilter = material ? `&& "${material}" in materials` : '';
  const colorFilter = color ? `&& ("${color}" in colors || "${color}" in items[].color)` : '';

  let order = 'order(_createdAt desc)';

  if (sort === 'price-asc') order = 'order(price asc)';
  if (sort === 'price-desc') order = 'order(price desc)';

  return `
    *[_type == "product" ${categoryFilter} ${subcategoryFilter} ${materialFilter} ${colorFilter}] | ${order} [${start}...${start + limit}] {
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
`
;

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

export const getAllProductColorsQuery = (category: any | null, subcategories: any[] | null) => {
  const categoryFilter = category ? `&& category == "${category.title}"` : '';
  const subcategoryFilter = subcategories && subcategories.length > 0 ? `&& subcategory in [${subcategories.map((subcategory: any) => `"${subcategory.title}"`).join(', ')}]` : '';

  return `array::unique(*[_type == "product" ${categoryFilter} ${subcategoryFilter}].colors[]) | order(@ asc)`;
};

export const getTotalProductsQuery = defineQuery(`
  count(*[_type == "product" 
    && ($categoryTitle == null || category == $categoryTitle)
    && ($subcategoryTitles == null || subcategory in $subcategoryTitles)
    && ($material == null || $material in materials)
    && ($color == null || $color in colors || $color in items[].color)
  ])
`);

export const getSubcategoryProductCountsQuery = (category: any | null, subcategories: any[] | null) => {
  const categoryFilter = category ? `&& category == "${category.title}"` : '';
  const subcategoryFilter = subcategories && subcategories.length > 0 ? `&& subcategory in [${subcategories.map((subcategory: any) => `"${subcategory.title}"`).join(', ')}]` : '';

  return `
  *[_type == "product" ${categoryFilter} ${subcategoryFilter}]`;
};

