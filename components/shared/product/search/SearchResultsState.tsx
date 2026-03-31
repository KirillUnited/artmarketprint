import {SectionTitle} from '@/components/layout/Section';
import {ProductData} from '@/components/shared/product/product.types';
import {ClientPagination} from '@/components/shared/product/ui/Pagination';
import { Button } from '@heroui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import {SearchTopActions} from './SearchTopActions';
import {ProductList} from '@/components/shared/product/ui';

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
			<Link href="/products/categories/all">
				<Button className="border" radius="sm" size='sm'>
					<ArrowLeftIcon size="18" />
					<span>Каталог</span>
				</Button>
			</Link>
			<SectionTitle className='TEST'>{`Результаты поиска для "${query}" (${totalFound} найдено)`}</SectionTitle>
			<SearchTopActions />
			<ProductList products={products}/>
			{totalPages > 1 && <ClientPagination basePath="/search" pageNumber={currentPage} totalPages={totalPages} />}
		</>
	);
}
