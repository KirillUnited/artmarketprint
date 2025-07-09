import {parseStringPromise} from 'xml2js';
import {Companies} from './companies';
import {groupProductsByCleanName} from '@/lib/products/catalog-utils';

export interface XmlCategory {
	_: string;
	$: {
		id: string;
		parentId?: string;
	};
}

export interface XmlProduct {
	$: {
		id: string;
		available: string;
	};
	categoryId: string[];
	currencyId: string[];
	description: string[];
	name: string[];
	param: Array<{_: string; $: {name: string}}>;
	picture: string[];
	price: string[];
	stock_minsk: string[];
	stock_shipper: string[];
	url: string[];
	vendorCode: string[];
}

export interface ProcessedProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	currency: string;
	stock: number;
	images: string[];
	url: string;
	sku: string;
	category: string;
	subcategory: string;
	brand: string;
	parameters: Record<string, string>;
}

/**
 * Fetches XML data from a specified URL and converts it to JSON.
 *
 * @param {string} url - The URL to fetch the XML data from.
 * @returns {Promise<any | null>} - A promise that resolves to the parsed JSON data or null in case of an error.
 */
export async function getXmlDataJSON(url: string): Promise<any | null> {
    try {
        const response = await fetch(url, {
            cache: 'force-cache',
        });

        if (!response.ok) throw new Error(`Request error: ${response.status}`);

        const xmlText = await response.text();

        return await parseStringPromise(xmlText);
    } catch (error) {
        console.error('Error loading XML:', error);

        return null;
    }
}

/**
 * Builds a category map from an array of XmlCategory objects.
 *
 * @param {XmlCategory[]} categories The categories to build the map from.
 * @returns {Record<string, { name: string; parentId?: string }>} A map of category IDs to objects with "name" and "parentId" properties.
 */
export function buildCategoryMap(categories: XmlCategory[]): Record<string, { name: string; parentId?: string }> {
	const categoryMap: Record<string, { name: string; parentId?: string }> = {};

	categories.forEach((cat) => {
		categoryMap[cat.$.id] = {
			name: cat._,
			parentId: cat.$.parentId
		};
	});

	return categoryMap;
}

/**
 * Gets the full category path including all parent categories.
 *
 * @param {string} categoryId The category ID to find the path for.
 * @param {Record<string, { name: string; parentId?: string }>} categoryMap A map of category IDs to objects with "name" and "parentId" properties.
 * @returns {string[]} An array of category names in the correct order.
 */
export function getFullCategoryPath(categoryId: string, categoryMap: ReturnType<typeof buildCategoryMap>): string[] {
	const path: string[] = [];
	let currentId: string | undefined = categoryId;

	while (currentId && categoryMap[currentId]) {
		path.unshift(categoryMap[currentId].name);
		currentId = categoryMap[currentId].parentId;
	}

	return path;
}

// export function getBrandFromUrl(url: string): string {
// 	const company = Object.values(Companies).find((company) => url.includes(company.name.toLowerCase().replace(/\s+/g, '-')));
//
// 	return company ? company.name : 'Unknown Brand';
// }
//
// export function processProduct(product: XmlProduct, categoryMap: Record<string, string>, brand: string): ProcessedProduct | null {
// 	try {
// 		const categoryId = product.categoryId?.[0];
// 		const categoryName = categoryMap[categoryId] || 'Uncategorized';
//
// 		// Extract parameters
// 		const parameters: Record<string, string> = {};
//
// 		if (Array.isArray(product.param)) {
// 			product.param.forEach((param) => {
// 				if (param.$.name && param._) {
// 					parameters[param.$.name] = param._;
// 				}
// 			});
// 		}
//
// 		// Determine if we should use a subcategory (this is a simple example)
// 		// You might need to adjust this based on your actual category structure
// 		let category = 'Other';
// 		let subcategory = 'Other';
//
// 		if (categoryName.includes('>')) {
// 			const parts = categoryName.split('>').map((part) => part.trim());
//
// 			category = parts[0];
// 			subcategory = parts[1] || 'Other';
// 		} else {
// 			category = categoryName;
// 		}
//
// 		return {
// 			id: product.$.id,
// 			name: product.name?.[0] || 'Unnamed Product',
// 			description: product.description?.[0] || '',
// 			price: parseFloat(product.price?.[0] || '0'),
// 			currency: product.currencyId?.[0] || 'BYN',
// 			stock: parseInt(product.stock_minsk?.[0] || '0') + parseInt(product.stock_shipper?.[0] || '0'),
// 			images: product.picture || [],
// 			url: product.url?.[0] || '',
// 			sku: product.vendorCode?.[0] || '',
// 			category,
// 			subcategory,
// 			brand,
// 			parameters,
// 		};
// 	} catch (error) {
// 		console.error('Error processing product:', error);
//
// 		return null;
// 	}
// }

// export async function fetchAndProcessProducts(companyId: keyof typeof Companies): Promise<ProcessedProduct[]> {
// 	const company = Companies[companyId];
//
// 	if (!company) {
// 		throw new Error(`Company with ID ${companyId} not found`);
// 	}
//
// 	const data = await getXmlDataJSON(company.product_data_url);
//
// 	console.log('Fetched data from:', company.name, data);
//
// 	if (!data) {
// 		return [];
// 	}
//
// 	const categories = data.xml_catalog?.shop?.[0]?.categories?.[0]?.category || [];
// 	const categoryMap = buildCategoryMap(categories);
//
// 	const products = data.xml_catalog?.shop?.[0]?.offers?.[0]?.offer || [];
// 	const processedProducts: ProcessedProduct[] = [];
//
// 	for (const product of products) {
// 		const processed = processProduct(product, categoryMap, company.name);
//
// 		if (processed) {
// 			processedProducts.push(processed);
// 		}
// 	}
//
// 	return processedProducts;
// }

export async function fetchProductsData(companyId: keyof typeof Companies): Promise<any[]> {
	const company = Companies[companyId];

	if (!company) {
		throw new Error(`Company with ID ${companyId} not found`);
	}

	const data = await getXmlDataJSON(company.product_data_url);

	console.log('Fetch data from:', company.name);

	if (!data) {
		return [];
	}

	const products = data.xml_catalog?.shop?.[0]?.offers?.[0]?.offer || [];
	const categories = data.xml_catalog?.shop?.[0]?.categories?.[0]?.category || [];

	return groupProductsByCleanName(products, categories, company.name);
}

export async function fetchAllProductsData() {
	const [...productsArrays] = await Promise.all(
		Object.values(Companies).map((company) => fetchProductsData(company.id))
	);
	const products = productsArrays.flat();

	return products;
}