import { client } from './client.mjs';

const CHUNK_SIZE = 50; // Process 50 products at a time
const MAX_DOCUMENTS = 8000; // Limit to 8000 documents

export function transform(external) {
	return {
		_type: 'product',
		_id: external._id,
		id: external.id,
		name: external.name,
		colors: external.colors,
		sizes: external.sizes,
		materials: external.materials,
		price: Number(external.price),
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

export async function importDataToSanity(products) {
	try {
		const documents = products.map(transform);
		let docCount = 0;

		console.log('🚀 Importing total products', documents.length);

		// Split documents into chunks
		for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
			const chunk = documents.slice(i, i + CHUNK_SIZE);
			let transaction = client.transaction();

			docCount += chunk.length;

			if (docCount > MAX_DOCUMENTS) {
				console.log(`⚠️ Reached maximum document limit of ${MAX_DOCUMENTS}. Stopping import.`);
				break;
			}

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

export function getUniqueCategories(products) {
	// Create a map to store unique categories by title
	const categoriesMap = new Map();

	products.forEach(product => {
		const categoryId = product?.categoryId;
		const categoryTitle = product?.category;
		const subcategoryTitle = product?.subcategory;

		if (categoryId && categoryTitle && typeof categoryTitle === 'string') {
			if (!categoriesMap.has(categoryTitle)) {
				categoriesMap.set(categoryTitle, { id: categoryId, subcategories: new Set() });
			}
			if (subcategoryTitle) {
				categoriesMap.get(categoryTitle).subcategories.add(subcategoryTitle);
			}
		}
	});

	// Convert map to array of objects with id and title
	return Array.from(categoriesMap.entries()).map(([title, { id, subcategories }]) => ({
		title,
		id,
		subcategories: Array.from(subcategories)
	}));
}

export async function importCategoriesToSanity(products) {
	try {
		const categories = getUniqueCategories(products);
		const documents = categories.map(category => ({
			_type: 'category',
			_id: category.id,
			title: category.title,
			subcategories: category.subcategories?.map(subcategory => ({
				_type: 'object',
				title: subcategory,
			})) || []
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