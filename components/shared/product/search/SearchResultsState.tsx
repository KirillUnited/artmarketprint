import {SectionTitle} from '@/components/layout/Section';
import {ProductData} from '@/components/shared/product/product.types';
import {ClientPagination} from '@/components/shared/product/ui/Pagination';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import {SearchTopActions} from './SearchTopActions';
import {ProductList} from '@/components/shared/product/ui';
import type { ServiceSearchItem } from '@/sanity/lib/service/searchServicesByAlgolia';

export type SearchResultsStateProps = {
	query: string;
	products: ProductData[];
	services: ServiceSearchItem[];
	totalFound: number;
	productsTotalFound?: number;
	servicesTotalFound?: number;
	currentPage: number;
	totalPages: number;
	selectedColor?: string | null;
};

export function SearchResultsState({
	query,
	products,
	services,
	totalFound,
	productsTotalFound = 0,
	servicesTotalFound = 0,
	currentPage,
	totalPages,
	selectedColor,
}: SearchResultsStateProps) {
	const productsWithSelectedColor = products.map((product) => ({
		...product,
		activeColor: selectedColor || product.activeColor || '',
	}));

	return (
		<>
			<Link href="/products/categories/all">
				<Button className="border" radius="sm" size='sm'>
					<ArrowLeftIcon size="18" />
					<span>Каталог</span>
				</Button>
			</Link>
			<SectionTitle className='TEST'>{`Результаты поиска для "${query}" (${totalFound} найдено)`}</SectionTitle>
			<p className="text-sm text-foreground/70 mb-2">
				{`Товары: ${productsTotalFound} • Услуги: ${servicesTotalFound}`}
			</p>
			{services.length > 0 && (
				<div className="grid gap-3 mb-6">
					{services.filter((service) => Boolean(service.slug)).map((service) => (
						<Link key={service.objectID} href={`/services/${service.slug}`}>
							<Card className="hover:bg-foreground/5 transition-colors">
								<CardBody className="gap-1">
									<p className="font-semibold">{service.title || 'Услуга'}</p>
									{service.description && <p className="text-sm text-foreground/70 line-clamp-2">{service.description}</p>}
								</CardBody>
							</Card>
						</Link>
					))}
				</div>
			)}
			{products.length > 0 && (
				<>
					<SearchTopActions />
					<ProductList products={productsWithSelectedColor}/>
				</>
			)}
			{totalPages > 1 && <ClientPagination basePath="/search" pageNumber={currentPage} totalPages={totalPages} />}
		</>
	);
}
