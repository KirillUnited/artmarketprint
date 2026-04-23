import { ProductThumb } from '@/components/shared/product/ui';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { getProductsQuery } from '@/components/shared/product/lib/queries';
import { ProductsNotFound } from '@/components/shared/product';

import { ProductData } from '../product.types';

import styles from './styles.module.css';

interface ProductListProps {
	categorySlug: string;
	pageNumber: number;
	PRODUCTS_PER_PAGE: number;
	subcategorySlug: any[] | null;
	sort: string | null;
	material: string | null;
	color: string | null;
}

export function ProductList({products}: {products: ProductData[]}) {
	return (
		<div className={styles.ProductList}>
			{products.map((product: ProductData) => (
				<ProductThumb key={product._id} item={product} />
			))}
		</div>
	);
}

export default async function ProductListContainer({ categorySlug, subcategorySlug, pageNumber, PRODUCTS_PER_PAGE, sort, material, color }: ProductListProps) {
	const products = await sanityFetch({
		query: getProductsQuery(categorySlug, subcategorySlug, pageNumber, PRODUCTS_PER_PAGE, sort, material, color),
		params: {},
	});
	const productsData = products.map((product: any) => ({...product, activeColor: color})) || [];

	if (!Array.isArray(productsData) || productsData.length === 0) {
		return <ProductsNotFound />;
	}

	return (
		<ProductList products={productsData} />
	);
}
