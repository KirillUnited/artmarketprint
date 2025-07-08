import {getPrice, priceTransform} from '../getPrice';
import {Companies} from './companies';
import {buildCategoryMap, getFullCategoryPath} from "@/lib/products/data";

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
 * Группировка товаров по "чистому" названию без цвета и размера
 * @param {Array} products - исходный массив товаров
 * @param categories - массив категорий
 * @param brand - название бренда
 * @returns {Array} - сгруппированный массив товаров
 */
export function groupProductsByCleanName(products: any[], categories = [], brand = '') {
	const grouped: Record<string, any> = {};
	const categoryMap = buildCategoryMap(categories);

	if (!Array.isArray(products) || products.length === 0) {
		return [];
	}

	products.forEach((product) => {
		// Получаем исходное название
		// const rawName = product.product?.[0]?._?.trim() || 'Без названия';
		const rawName = product.product?.[0]?._?.trim() || product.name?.[0]?.trim() || 'Без названия';

		// Удаляем цвет и размер после последней запятой (например: "Ланъярд из полиэстера HOST, Черный XL." -> "Ланъярд из полиэстера HOST")
		const cleanName = rawName.split(',')[0].trim();

		const color = product.vcolor?.[0]?.trim() || getColorsFromParams(product)[0]?.trim() || '';
		const size = product.size_range?.[0]?.trim() || '';
		// Get full category path
		const categoryPath = getFullCategoryPath(product.categoryId?.[0], categoryMap);
		// Create unique key for product variation
		const variationKey = `${color || ''}:${size || ''}`;

		if (!grouped[cleanName]) {
			grouped[cleanName] = {
				_id: product?.id?.[0]?._ || product?.$?.id || '',
				id: product?.id?.[0]?._ || product?.$?.id,
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
				price: getPrice(product.price?.[0], 1 - priceTransform(Companies.ARTE.discount)),
				url: product.url?.[0] || '',
				image: product.images_urls?.[0]?.split(',')[0] || product.picture?.[0]?.split(',')[0] || '',
				images_urls: product.images_urls?.[0] || product.picture?.[0] || '',
				description: product.general_description?.[0] || product.description?.[0] || '',
				variation_description: product.variation_description?.[0] || product.param?.[0] || '',
				category: product.category?.[0]?.split('|')[0] || categoryPath[0] || '',
				subcategory: product.category?.[0]?.split('|')[0] || categoryPath[1] || '',
				stock: product.stock?.[0] || parseInt(product.stock_minsk?.[0] || '0') + parseInt(product.stock_shipper?.[0] || '0'),
				sku: product.sku?.[0] || product.vendorCode?.[0] || '',
				brand,
			};
		}

		if (color) grouped[cleanName].colors.add(color);
		if (size) grouped[cleanName].sizes.add(size);

		// Only store unique variations
		if (!grouped[cleanName].items.has(variationKey)) {
			const {picture} = product;
			const vars = {
				id: product?.id?.[0]?._ || product.$?.id || '',
				cover: picture?.[0]?.split(',')[0] || '',
				images_urls: picture?.[0] || '',
				color,
				size,
				stock: product.stock?.[0] || parseInt(product.stock_minsk?.[0] || '0') + parseInt(product.stock_shipper?.[0] || '0'),
				sku: product.sku?.[0] || product.vendorCode?.[0] || '',
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

export function getColorsFromParams(product: any) {
	const params = formatParams(product.param) || [];
	const colors = new Set<string>();

	params.forEach((param) => {
		if (param.name === 'Цвет') {
			colors.add(param.value);
		}
	});

	return Array.from(colors);
}
