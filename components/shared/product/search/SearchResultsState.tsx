import {SectionTitle} from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import {Product} from '@/components/shared/product/product.types';

import {SearchTopActions} from './SearchTopActions';

export type SearchResultsStateProps = {
	query: string;
	products: Product[];
	categories: Array<{category: string; subcategories: string[]}>;
};

export function SearchResultsState({query, products, categories}: SearchResultsStateProps) {
	return (
		<>
			<SectionTitle>{`Результаты поиска для "${query}" (${products.length} найдено)`}</SectionTitle>
			<SearchTopActions />
			<ProductsView products={products} categories={categories} totalItemsView={20} showFilter={true} />
		</>
	);
}

