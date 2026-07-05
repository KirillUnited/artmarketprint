import { parseStringPromise } from 'xml2js';

import { Companies } from './companies.mjs';
import { groupProductsByCleanName } from './catalog-utils.mjs';

/**
 * Fetches XML data from a specified URL and converts it to JSON.
 *
 * @param {string} xmlUrl - The URL to fetch the XML data from.
 * @returns {Promise<any | null>} - A promise that resolves to the parsed JSON data or null in case of an error.
 */
const DEFAULT_XML_FETCH_TIMEOUT_MS = 60_000;
const DEFAULT_XML_FETCH_RETRIES = 2;

async function fetchTextWithRetry(url, { timeoutMs, retries }) {
	let lastError;

	for (let attempt = 0; attempt <= retries; attempt += 1) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

		try {
			const response = await fetch(url, {
				signal: controller.signal,
				headers: {
					Accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const contentType = response.headers.get('content-type') || '';
			const text = await response.text();

			if (contentType.includes('text/html')) {
				throw new Error(`Expected XML but got HTML (content-type: ${contentType})`);
			}

			if (!text || text.length < 50) {
				throw new Error('Empty or слишком короткий ответ вместо XML');
			}

			return text;
		} catch (err) {
			lastError = err;

			if (attempt < retries) {
				await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
				continue;
			}

			throw err;
		} finally {
			clearTimeout(timeoutId);
		}
	}

	throw lastError;
}

export async function getXmlDataJSON(xmlUrl) {
	const xmlText = await fetchTextWithRetry(xmlUrl, {
		timeoutMs: DEFAULT_XML_FETCH_TIMEOUT_MS,
		retries: DEFAULT_XML_FETCH_RETRIES,
	});

	try {
		const result = await parseStringPromise(xmlText, {
			mergeAttrs: true,
			explicitArray: false,
			trim: true,
			normalize: true,
		});

		return result;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`Error parsing XML from ${xmlUrl}: ${message}`);
	}
}

/**
 * Builds a category map from an array of XmlCategory objects.
 *
 * @param {XmlCategory[]} categories The categories to build the map from.
 * @returns {Record<string, { name: string; parentId?: string }>} A map of category IDs to objects with "name" and "parentId" properties.
 */
export function buildCategoryMap(categories) {
	const categoryMap = {};

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
export function getFullCategoryPath(categoryId, categoryMap) {
	const path = [];
	let currentId = categoryId;

	while (currentId && categoryMap[currentId]) {
		path.unshift(categoryMap[currentId].name);
		currentId = categoryMap[currentId].parentId;
	}

	return path;
}

export async function fetchProductsData(companyId) {
	const company = Companies[companyId];

	if (!company) {
		throw new Error(`Company with ID ${companyId} not found`);
	}

	const data = await getXmlDataJSON(company.product_data_url);

	const offerCount = Array.isArray(data?.xml_catalog?.shop?.offers?.offer)
		? data.xml_catalog.shop.offers.offer.length
		: data?.xml_catalog?.shop?.offers?.offer
			? 1
			: 0;

	console.log('Fetched data from:', company.name, `offers=${offerCount}`);

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