import { getPrice, priceTransform } from '../getPrice.mjs';
import { Companies } from './companies.mjs';
import { buildCategoryMap, getFullCategoryPath } from './data.mjs';

// Типы товара

/**
 * Group products by "clean" name without color and size
 * @param {Array} products - source array of products
 * @param categories - array of categories
 * @param brand - brand name
 * @returns {Array} - grouped array of products
 */
export function groupProductsByCleanName(products, categories = [], brand = '') {
	const grouped = {};
	const categoryMap = buildCategoryMap(categories);

	if (!Array.isArray(products) || products.length === 0) {
		console.error('groupProductsByCleanName: products is not an array or is empty');

		return [];
	}

	products.forEach((product) => {
		// For RU stock we use only stock, for BY stock we use stock_minsk, shipper stock need to check
		// const stock = product.stock?.[0] + parseInt(product.stock_shipper || '0') || 0;
		const stock = parseInt(product.stock_minsk || '0');

		// Not add product if stock is zero
		if (stock == 0) {
			return;
		}

		// Get original name
		const rawName = product.product?.[0]?._?.trim() || product.name?.trim() || 'Unnamed';
		// Remove color and size after last comma (for example: "Lanyard from polyester HOST, Black XL." -> "Lanyard from polyester HOST")
		const cleanName = rawName.split(',')[0].trim();
		// Get color and size and material
		const color = product.vcolor?.[0]?.trim() || getColorsFromParams(product)[0]?.trim() || '';
		const size = product.size_range?.[0]?.trim() || getSizesFromParams(product)[0]?.trim() || '';
		const material = product.material?.[0]?.trim() || getMaterialsFromParams(product)[0]?.trim() || '';
		// Create unique key for product variation
		const variationKey = `${color || ''}:${size || ''}`;
		// Get full category path
		const categoryId = product.categoryId || '';
		const categoryPath = categoryId ? getFullCategoryPath(categoryId, categoryMap) : [];
		// Get category and subcategory
		const category = product.category?.[0]?.split('|')[0] || categoryPath[0] || '';
		const subcategory = product.category?.[0]?.split('|')[0] || categoryPath[1] || '';
		// Get product properties
		const productId = product?.id?.[0]?._ || product?.id || '';
		const sku = product.sku?.[0] || product.vendorCode || '';
		const gallery = product.images_urls?.[0] || product.picture || '';
		const thumbnailImage = gallery?.split(',')[0] || gallery?.split(',')[0] || '';
		// const price = getPrice(product.price, 1 - priceTransform(Companies.ARTE.discount));
		const price = product?.price || 0 ;
		const description = product.general_description?.[0] || product.description || '';
		const variation_description = product.param ? extractParamsToHtmlList(product.param) : '';
		const url = product.url?.[0] || '';

		if (!grouped[cleanName]) {
			grouped[cleanName] = {
				_id: productId,
				id: productId,
				name: cleanName,
				colors: new Set(),
				sizes: new Set(),
				materials: new Set(),
				items: new Map(), // Map to store unique variations
				price,
				url,
				image: thumbnailImage,
				images_urls: gallery,
				description,
				variation_description,
				categoryId,
				category,
				subcategory,
				stock,
				sku,
				brand,
			};
		}

		if (color) grouped[cleanName].colors.add(color);
		if (size) grouped[cleanName].sizes.add(size);
		if (material) grouped[cleanName].materials.add(material);

		// Only store unique variations
		if (!grouped[cleanName].items.has(variationKey)) {
			const vars = {
				id: productId,
				cover: thumbnailImage,
				images_urls: gallery,
				color,
				size,
				stock,
				sku,
				brand,
				material,
			};

			grouped[cleanName].items.set(variationKey, vars);
		}
	});

	// Transform the grouped data
	return Object.values(grouped).map((entry) => ({
		...entry,
		colors: Array.from(entry.colors),
		sizes: Array.from(entry.sizes),
		materials: Array.from(entry.materials),
		items: Array.from(entry.items.values()), // Convert Map values to array
	}));
}

export function formatParams(params) {
	return params.map((param) => ({
		name: param.name,
		value: param._,
	}));
}

export function getParamsValueByName(params, name) {
	return params
		.filter((param) => param.name === name)
		.map((param) => param.value);
}

export function getColorsFromParams(product) {
	return getParamsValueByName(formatParams(product.param) || [], 'Цвет');
}

export function getMaterialsFromParams(product) {
	const params = formatParams(product.param) || [];
	const regex = /Материал\s+\S+/;

	return params
		.filter((param) => regex.test(param.name))
		.map((param) => param.value);
}

export function getSizesFromParams(product) {
	return getParamsValueByName(formatParams(product.param) || [], 'Размер')
		.filter((size) => size !== 'one_size')
		.sort((a, b) => a.localeCompare(b));
}

export function extractParamsToHtmlList(params) {
	const listItems = params.map((param) => {
		if (param.name && param._) {
			return `<li><strong>${param.name}:</strong> ${param._}</li>`;
		}
		return '';
	}).join('');

	return `<ul>${listItems}</ul>`;
}