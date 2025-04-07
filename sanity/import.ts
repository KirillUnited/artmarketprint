import { extractProductData } from "@/lib/extract-product-data";
import { Product } from "@/types/product.types";
import { client } from "./client";
import { getAllProducts } from "@/lib/actions/product.actions";

const jsonFilePath = '../_data/products.json';

const CHUNK_SIZE = 50; // Process 50 products at a time

function transform(external: Product) {
    const { id, name, price, category, description, image } = extractProductData(external);
    return {
        _id: `${id}`, // use the id of the record from the external source (we happen to know the API only return unique values for `id`)
        _type: 'product',
        name,
        price,
        category,
        description,
        image,
    }
}

export async function importDataToSanity() {
    try {
        const AllProducts = await getAllProducts();
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