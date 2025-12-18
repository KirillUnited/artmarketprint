import {MaterialFilter, ProductThumb} from '@/components/shared/product/ui';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {getProductsQuery} from '@/components/shared/product/lib/queries';
import {ProductData} from '../product.types';

import styles from './styles.module.css';
import ProductSearchForm from '@/components/shared/product/ProductSearchForm';
import {ProductsNotFound} from '@/components/shared/product';

interface ProductListProps {
	categorySlug: string;
	pageNumber: number;
	PRODUCTS_PER_PAGE: number;
	subcategorySlug: string | null;
	sort: string | null;
	material: string | null;
}

export default async function ProductList({categorySlug, subcategorySlug, pageNumber, PRODUCTS_PER_PAGE, sort, material}: ProductListProps) {
	const products = await sanityFetch({
		query: getProductsQuery(categorySlug, subcategorySlug, pageNumber, PRODUCTS_PER_PAGE, sort, material),
		params: {},
	});

	if (!Array.isArray(products) || products.length === 0) {
		return <ProductsNotFound />;
	}

	return (
		<div className={styles.ProductList}>
			{products.map((product: ProductData) => (
				<ProductThumb key={product._id} item={product} />
			))}
		</div>
	);
}
