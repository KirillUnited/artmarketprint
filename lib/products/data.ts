import { parseStringPromise } from 'xml2js';
import { Companies } from './companies';
import { groupProductsByCleanName } from '@/lib/products/catalog-utils';

export interface XmlCategory {
	_: string;
	id: string;
	parentId?: string;
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
	param: Array<{ _: string; $: { name: string } }>;
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
 * @param {string} xmlUrl - The URL to fetch the XML data from.
 * @returns {Promise<any | null>} - A promise that resolves to the parsed JSON data or null in case of an error.
 */
export async function getXmlDataJSON(xmlUrl: string): Promise<any | null> {
	try {
		// Загружаем XML файл
		const response = await fetch(xmlUrl, {
			headers: {
				'Content-Type': 'application/xml',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const xmlText = await response.text();

		// Парсим XML в JSON с помощью xml2js
		const result = await parseStringPromise(xmlText, {
			mergeAttrs: true, // Атрибуты объединяются в объект
			explicitArray: false, // Не оборачивать одиночные элементы в массив
			trim: true, // Удалять пробелы
			normalize: true, // Нормализовать пробелы
		});

		return result;
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
		categoryMap[cat.id] = {
			name: cat._,
			parentId: cat.parentId
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

export async function fetchProductsData(companyId: keyof typeof Companies): Promise<any[]> {
	const company = Companies[companyId];

	if (!company) {
		throw new Error(`Company with ID ${companyId} not found`);
	}

	const data = await getXmlDataJSON(company.product_data_url);

	if (!data) {
		return [];
	}

	console.log('Fetched data from:', company.name, data);

	const products = data.xml_catalog?.shop?.offers?.offer || [];
	const categories = data.xml_catalog?.shop?.categories?.category || [];

	return groupProductsByCleanName(products, categories, company.abbr);
}

export async function fetchAllProductsData() {
	const [...productsArrays] = await Promise.all(
		Object.values(Companies).map((company) => fetchProductsData(company.id))
	);

	return productsArrays.flat();
}