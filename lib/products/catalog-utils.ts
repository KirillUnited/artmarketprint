import {getPrice, priceTransform} from '../getPrice';
import {Companies} from './companies';
import {buildCategoryMap, getFullCategoryPath} from '@/lib/products/data';

// Типы товара
export interface RawProduct {
	_id: string;
	_type: string;
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	category: string;
	description: string;
	image: string;
	images_urls: string;
	name: string;
	price: number;
	brand?: string;
}

export interface ProductVariation {
	color: string;
	size: string;
}

export interface CatalogProduct extends Omit<RawProduct, 'name'> {
	name: string; // Очищенное название без цвета и размера
	variations: ProductVariation[];
}

/**
 * Group products by "clean" name without color and size
 * @param {Array} products - source array of products
 * @param categories - array of categories
 * @param brand - brand name
 * @returns {Array} - grouped array of products
 */
export function groupProductsByCleanName(products: any[], categories = [], brand = '') {
	const grouped: Record<string, any> = {};
	const categoryMap = buildCategoryMap(categories);

	if (!Array.isArray(products) || products.length === 0) {
		console.error('groupProductsByCleanName: products is not an array or is empty');

		return [];
	}

	products.forEach((product) => {
		const stock = product.stock?.[0] || parseInt(product.stock_minsk?.[0] || '0') + parseInt(product.stock_shipper?.[0] || '0') || 0;

		// Not add product if stock is zero
		if (stock == 0) {
			return;
		}

		// Get original name
		const rawName = product.product?.[0]?._?.trim() || product.name?.[0]?.trim() || 'Unnamed';
		// Remove color and size after last comma (for example: "Lanyard from polyester HOST, Black XL." -> "Lanyard from polyester HOST")
		const cleanName = rawName.split(',')[0].trim();
		// Get color and size
		const color = product.vcolor?.[0]?.trim() || getColorsFromParams(product)[0]?.trim() || '';
		const size = product.size_range?.[0]?.trim() || getSizesFromParams(product)[0]?.trim() || '';
		// Create unique key for product variation
		const variationKey = `${color || ''}:${size || ''}`;
		// Get full category path
		const categoryId = product.categoryId?.[0];
		const categoryPath = categoryId ? getFullCategoryPath(categoryId, categoryMap) : [];
		// Get category and subcategory
		const category = product.category?.[0]?.split('|')[0] || categoryPath[0] || '';
		const subcategory = product.category?.[0]?.split('|')[0] || categoryPath[1] || '';
		// Get product properties
		const productId = product?.id?.[0]?._ || product?.$?.id || '';
		const sku = product.sku?.[0] || product.vendorCode?.[0] || '';
		const gallery = product.images_urls?.[0] || product.picture?.[0] || '';
		const thumbnailImage = gallery?.split(',')[0] || gallery?.split(',')[0] || '';
		const price = getPrice(product.price?.[0], 1 - priceTransform(Companies.ARTE.discount));
		const description = product.general_description?.[0] || product.description?.[0] || '';
		const variation_description = product.param ? extractParamsToHtmlList(product.param) : '';
		const url = product.url?.[0] || '';

		if (!grouped[cleanName]) {
			grouped[cleanName] = {
				_id: productId,
				id: productId,
				name: cleanName,
				colors: new Set(),
				sizes: new Set(),
				items: new Map<
					string,
					{
						id: string;
						images_urls: string;
						color: string;
						cover: string;
						stock: string;
						sku: string;
					}
				>(), // Map to store unique variations
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
			};

			grouped[cleanName].items.set(variationKey, vars);
		}
	});

	// Transform the grouped data
	return Object.values(grouped).map((entry) => ({
		...entry,
		colors: Array.from(entry.colors),
		sizes: Array.from(entry.sizes),
		items: Array.from(entry.items.values()), // Convert Map values to array
	}));
}

export function formatParams(params: any[]) {
	return params.map((param) => ({
		name: param.$.name,
		value: param._,
	}));
}

export function getParamsValueByName(params: any[], name: string) {
	return params
		.filter((param) => param.name === name)
		.map((param) => param.value);
}

export function getColorsFromParams(product: any) {
	return getParamsValueByName(formatParams(product.param) || [], 'Цвет');
}

export function getSizesFromParams(product: any) {
	return getParamsValueByName(formatParams(product.param) || [], 'Размер')
		.filter((size) => size !== 'one_size')
		.sort((a, b) => a.localeCompare(b));
}

export function extractParamsToHtmlList(params: any[]): string {
	const listItems = params.map((param) => {
		if (param.$.name && param._) {
			return `<li><strong>${param.$.name}:</strong> ${param._}</li>`;
		}
		return '';
	}).join('');

	return `<ul>${listItems}</ul>`;
}