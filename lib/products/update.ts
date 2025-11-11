import {importDataToSanity} from '@/sanity/import';
import {fetchAllProductsData} from '@/lib/products/data';

export async function updateProducts() {
	const products = await fetchAllProductsData();

	await importDataToSanity(products);
	// await importCategoriesToSanity(products);
}
