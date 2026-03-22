import {SectionTitle} from '@/components/layout/Section';
import {ProductData} from '@/components/shared/product/product.types';
import {ClientPagination} from '@/components/shared/product/ui/Pagination';
import ProductThumb from '@/components/shared/product/ui/ProductThumb';
import styles from '@/components/shared/product/ui/styles.module.css';

import {SearchTopActions} from './SearchTopActions';

export type SearchResultsStateProps = {
	query: string;
	products: ProductData[];
	totalFound: number;
	currentPage: number;
	totalPages: number;
};

export function SearchResultsState({query, products, totalFound, currentPage, totalPages}: SearchResultsStateProps) {
	return (
		<>
			<SectionTitle>{`Результаты поиска для "${query}" (${totalFound} найдено)`}</SectionTitle>
			<SearchTopActions />
			<div className={styles.ProductList}>
				{products.map((product) => (
					<ProductThumb key={product._id} item={product} />
				))}
			</div>
			{totalPages > 1 && <ClientPagination basePath="/search" pageNumber={currentPage} totalPages={totalPages} />}
		</>
	);
}
