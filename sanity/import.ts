import { extractProductData } from "@/lib/extract-product-data";
import { Product } from "@/components/shared/product/product.types";
import { client } from "./client";
import { getProductsByLimit } from "@/lib/actions/product.actions";

const jsonFilePath = '../_data/products.json';

const CHUNK_SIZE = 50; // Process 50 products at a time

function transform(external: Product) {
    const extractedData = extractProductData(external);
    return {
        _type: 'product',
        ...extractedData
    }
}

export async function importDataToSanity() {
    try {
        const AllProducts = await getProductsByLimit(8000);
        const documents = AllProducts.map(transform);

        // Split documents into chunks
        for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
            const chunk = documents.slice(i, i + CHUNK_SIZE);
            let transaction = client.transaction();

            chunk.forEach(document => {
                transaction.createOrReplace(document);
            });

            await transaction.commit();
            console.log(`✅ Imported products ${i + 1} to ${Math.min(i + CHUNK_SIZE, documents.length)}`);

            // Add a small delay between chunks to prevent rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('✅ All products imported successfully!');
    } catch (error) {
        console.error('❌ Import failed:');
    }
}