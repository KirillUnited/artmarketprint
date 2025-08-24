import {ProductThumb} from "@/components/shared/product/ui/index";
import {sanityFetch} from "@/sanity/lib/sanityFetch";
import {getProductsQuery} from "@/components/shared/product/lib/queries";
import { ProductData } from "../product.types";

interface ProductListProps {
    categorySlug: string;
    pageNumber: number;
    PRODUCTS_PER_PAGE: number;
}

export default async function ProductList({ categorySlug, pageNumber, PRODUCTS_PER_PAGE }: ProductListProps) {
    const products = await sanityFetch({
        query: getProductsQuery(categorySlug, pageNumber, PRODUCTS_PER_PAGE),
        params: {}
    });

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
            {products.map((product: ProductData) => (
                <ProductThumb key={product._id} item={product} />
            ))}
        </div>
    );
}