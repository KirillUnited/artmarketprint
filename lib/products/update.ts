import {importCategoriesToSanity, importDataToSanity} from "@/sanity/import";
import {fetchAllProductsData} from "@/lib/products/data";

export async function updateProducts() {
    const products = await fetchAllProductsData();
    const importedData = await importDataToSanity(products);
    const importedCategories = await importCategoriesToSanity(products);
}