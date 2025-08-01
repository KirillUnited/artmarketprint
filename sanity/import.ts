import {Product} from '@/components/shared/product/product.types';
import {client} from './client';

const CHUNK_SIZE = 50; // Process 50 products at a time

export function transform(external: Product) {
	return {
		_type: 'product',
		_id: external._id,
		id: external.id,
		name: external.name,
		colors: external.colors,
		sizes: external.sizes,
		price: external.price,
		image: external.image,
		images_urls: external.images_urls,
		description: external.description,
		variation_description: external.variation_description,
		category: external.category,
		subcategory: external.subcategory,
		items: external.items,
		stock: external.stock,
		sku: external.sku,
		brand: external.brand,
	};
}

export async function importDataToSanity(products: Product[]) {
	try {
		const documents = products.map(transform);

		console.log('🚀 Importing total products', documents.length);

		// Split documents into chunks
		for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
			const chunk = documents.slice(i, i + CHUNK_SIZE);
			let transaction = client.transaction();

			chunk.forEach((document) => {
				transaction.createOrReplace(document);
			});

			await transaction.commit();
			console.log(`✅ Imported products ${i + 1} to ${Math.min(i + CHUNK_SIZE, documents.length)}`);

			// Add a small delay between chunks to prevent rate limiting
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		console.log('✅ All products imported successfully!');
	} catch (error) {
		console.error(error);
		console.error('❌ Import failed:');
	}
}

export function getUniqueCategories(products: Product[]) {
	// Create a map to store unique categories by title
	const categoriesMap = new Map<string, string>();

	products.forEach(product => {
		const categoryId = product?.categoryId;
		const categoryTitle = product?.category;

		if (categoryId && categoryTitle) {
			if (typeof categoryTitle === "string") {
				categoriesMap.set(categoryTitle, categoryId);
			}
		}
	});

	// Convert map to array of objects with id and title
	return Array.from(categoriesMap.entries()).map(([title, id]) => ({
		title,
		id
	}));
}

export async function importCategoriesToSanity(products: Product[]) {
	try {
		const categories = getUniqueCategories(products);
		console.log(categories)
		const documents = categories.map(category => ({
			_type: 'category',
			_id: category.id,
			title: category.title,
		}));

		console.log('🚀 Importing total categories', documents.length);

		// Split documents into chunks
		for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
			const chunk = documents.slice(i, i + CHUNK_SIZE);
			let transaction = client.transaction();

			chunk.forEach((document) => {
				transaction.createOrReplace(document);
			});

			await transaction.commit();
			console.log(`✅ Imported categories ${i + 1} to ${Math.min(i + CHUNK_SIZE, documents.length)}`);

			// Add a small delay between chunks to prevent rate limiting
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		console.log('✅ All categories imported successfully!');
	} catch (error) {
		console.error(error);
		console.error('❌ Import failed:');
	}
}