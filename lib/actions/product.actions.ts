'use server';

// import { getJsonFileData } from '../utils';
// import { groupProductsByCleanName } from '../products/catalog-utils';

/**
 * Fetches all products from the JSON file data.
 *
 * @return {Promise<any[]>} A promise that resolves to an array of products.
 */
// export async function getAllProducts(): Promise<any[]> {
//   // Retrieve JSON file data using the utility function
//   const products = await getJsonFileData();
//
//   // Return the list of products or an empty array if not available
//   return products?.data?.item ?? [];
// }

/**
 * Retrieves a list of unique product categories from the available products.
 *
 * @return {string[]} An array of unique product categories
 */
// export async function getAllProductCategories(): Promise<string[]> {
//   const products = await getAllProducts();

//   const categories = new Set<string>();

//   // Iterate over products and extract the category name from each product
//   // The category name is the first part of the category property, separated by '|'
//   for (const product of products) {
//     if (!product?.category) continue;
//     const [categoryName] = product.category[0].split('|');
//     categories.add(categoryName);
//   }

//   // Convert the Set to an array and return it
//   return Array.from(categories);
// }

// export async function getAllProducts() {
//   // const DATA_FILE_PATH = path.join(process.cwd(), '_data/products-20-03-25.json');
//   const DATA_FILE_PATH = '../_data/products-27-03-25.json';
//   const { data } = await getJsonFileData(DATA_FILE_PATH) ?? {};

//   return data?.item ?? [];
// }

// /**
//  * Retrieves a list of unique product categories from the available products.
//  *
//  * @return {string[]} An array of unique product categories
//  */
// export async function getAllProductCategories() {
//   // Fetch all products
//   const products = await getAllProducts();

//   // Define a function that takes a category string and returns the first part of it
//   // The category string is in the format "category|subcategory"
//   const getCategory = (category: string) => {
//     // Split the category string into an array of two strings
//     const [categoryName, subcategoryName] = category[0].split('|');
//     // Return the first string (the category name)
//     return categoryName;
//   };

//   // Create a Set to store the unique categories
//   const categories = new Set();

//   // Loop through each product and add its category to the Set
//   products?.map((product: any) => {
//     const categoryName = getCategory(product.category);
//     categories.add(categoryName);
//   });

//   // Convert the Set to an array and return it
//   return Array.from(categories);
// }

// export async function getProductsByLimit(limit: number) {
//   // Use a more efficient way to get a subset of the products array
//   return (await getAllProducts()).slice(0, limit);
// }
//
// export async function getRelatedProductsByCategory(category: string, id: number, limit = 10) {
//   const products = await getAllProducts();
//   const relatedProducts = products.filter((product: any) => product.category[0].split('|')[0] === category && product.id[0]['_'] !== id);
//
//   return Array.from(relatedProducts).slice(0, limit);
// }
//
// export async function getProductBySlug(slug: string) {
//   const products = await getAllProducts();
//   const parsedProducts = groupProductsByCleanName(products);
//   const product = parsedProducts.find((product) => product.id === slug);
//
//   return product;
// }
//
// export async function searchProductsByName(searchParam: string) {
//   const products = await getAllProducts();
//
//   return products.filter((product: any) => product.product[0]['_'].toLowerCase().includes(searchParam.toLowerCase()));
// }
//
// export async function getProductsByCategory(category: string) {
//   const products = await getAllProducts();
//
//   return products.filter((product: any) => {
//     return (product.category[0].split('|')[0] === category);
//   });
// }
//
// export async function getProductsByCategoryTitle(categoryTitle: string) {
//   const products = await getAllProducts();
//
//   return products.filter((product: any) => product.category[0] === categoryTitle);
// }