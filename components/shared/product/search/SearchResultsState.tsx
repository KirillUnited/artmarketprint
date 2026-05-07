import { SectionTitle } from '@/components/layout/Section';
import { ProductData } from '@/components/shared/product/product.types';
import { ClientPagination } from '@/components/shared/product/ui/Pagination';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Tabs } from '@heroui/react';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { SearchTopActions } from './SearchTopActions';
import { ProductList } from '@/components/shared/product/ui';
import type { ServiceSearchItem } from '@/sanity/lib/service/searchServicesByAlgolia';
import Image from 'next/image';

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
	selectedSearchType?: 'products' | 'services' | null;
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
	selectedSearchType = null,
}: SearchResultsStateProps) {
	const productsWithSelectedColor = products.map((product) => ({
		...product,
		activeColor: selectedColor || product.activeColor || '',
	}));
	const hasProducts = products.length > 0;
	const hasServices = services.length > 0;
	const shouldShowProducts = hasProducts;
	const shouldShowServices = hasServices;
	const defaultSelectedKey =
		selectedSearchType === 'services' && hasServices
			? 'services'
			: selectedSearchType === 'products' && hasProducts
				? 'products'
				: hasProducts
					? 'products'
					: 'services';
	const tabsOrder = selectedSearchType === 'services' ? ['services', 'products'] : ['products', 'services'];

	return (
		<>
			<Link href="/products/categories/all">
				<Button className="border" radius="sm" size='sm'>
					<ArrowLeftIcon size="18" />
					<span>Каталог</span>
				</Button>
			</Link>
			<SectionTitle>{`Результаты поиска для "${query}" (${totalFound} найдено)`}</SectionTitle>
			{(shouldShowServices || shouldShowProducts) && (
				<Tabs className="w-full mb-2" defaultSelectedKey={defaultSelectedKey}>
					<Tabs.ListContainer>
						<Tabs.List aria-label="Search results">
							{tabsOrder.map((tabKey) => {
								if (tabKey === 'products' && shouldShowProducts) {
									return (
										<Tabs.Tab key="products" id="products">
											{`Товары (${productsTotalFound})`}
											<Tabs.Indicator />
										</Tabs.Tab>
									);
								}
								if (tabKey === 'services' && shouldShowServices) {
									return (
										<Tabs.Tab key="services" id="services">
											{`Услуги (${servicesTotalFound})`}
											<Tabs.Indicator />
										</Tabs.Tab>
									);
								}
								return null;
							})}
						</Tabs.List>
					</Tabs.ListContainer>
					{shouldShowProducts && (
						<Tabs.Panel className="pt-4" id="products">
							<SearchTopActions />
							<ProductList products={productsWithSelectedColor} />
							{totalPages > 1 && <ClientPagination basePath="/search" pageNumber={currentPage} totalPages={totalPages} />}
						</Tabs.Panel>
					)}
					{shouldShowServices && (
						<Tabs.Panel className="pt-4" id="services">
							<div className="grid md:grid-cols-2 gap-3 mb-6">
								{services.filter((service) => Boolean(service.slug)).map((service) => (
									<Link key={service.objectID} href={`/services/${service.slug}`}>
										<Card className="hover:bg-foreground/5 transition-colors flex-row">
											<Image src={service.imageUrl || ''} alt={service.title || 'Услуга'} width={120} height={80} />
											<CardBody className="gap-1">
												<p className="font-semibold">{service.title || 'Услуга'}</p>
												{service.description && <p className="text-sm text-foreground/70 line-clamp-2">{service.description}</p>}
											</CardBody>
										</Card>
									</Link>
								))}
							</div>
						</Tabs.Panel>
					)}
				</Tabs>
			)}
		</>
	);
}
