import { extractProductData } from "@/lib/extract-product-data";
import { Product } from "@/types/product.types";
import { client } from "./client";
import { getAllProducts } from "@/lib/actions/product.actions";

const jsonFilePath = '../_data/products.json';

function transform(external: Product) {
    const { id, name, price, category, description, image } = extractProductData(external);
    return {
        _id: `imported-product-${id}`, // use the id of the record from the external source (we happen to know the API only return unique values for `id`)
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

        // Filter out documents that have a _type !== 'country'
        const products = documents.filter(doc =>
            doc._type === 'product'
        )

        // Write all countries to the dataset using a createOrReplace mutation
        const allProductsWritten = Promise.all(products.map(product =>
            client.createOrReplace(product)
        ));

        console.log('✅ All products written!')

        // return allProductsWritten;
    } catch (error) {
        console.error('❌ Import failed:', error.message);
    }
}