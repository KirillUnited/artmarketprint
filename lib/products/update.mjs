import { importDataToSanity } from '../../sanity/import.mjs';
import { fetchAllProductsData } from './data.mjs';

export async function updateProducts() {
	const products = await fetchAllProductsData();

	await importDataToSanity(products);
	// await importCategoriesToSanity(products);
}