import { extractProductData } from "@/lib/extract-product-data";
import { Product } from "@/components/shared/product/product.types";
import { client } from "./client";
import { getProductsByLimit } from "@/lib/actions/product.actions";
import { groupProductsByCleanName } from "@/lib/catalog-utils";

const jsonFilePath = '../_data/products.json';

const CHUNK_SIZE = 50; // Process 50 products at a time

function transform(external: Product) {
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
    };
}

export async function importDataToSanity() {
    try {
        const AllProducts = await getProductsByLimit(8000);
        const parsedProducts = groupProductsByCleanName(AllProducts);
        const documents = parsedProducts.map(transform);

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