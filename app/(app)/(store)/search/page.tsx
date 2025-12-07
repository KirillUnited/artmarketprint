import {Card, CardBody, CardFooter, CardHeader} from '@heroui/card';
import {PanelRightOpenIcon, SearchXIcon, ShoppingCart, ShoppingCartIcon} from 'lucide-react';
import Link from 'next/link';

import Section, {SectionTitle} from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import {searchProductsByName} from '@/sanity/lib/product/searchProductsByName';
import {Button} from '@heroui/button';
import {FeaturedProducts} from '@/components/shared/product/FeaturedProducts';
import ProductSearchForm from '@/components/shared/product/ProductSearchForm';
import {collectCategoriesAndSubcategories} from '@/lib/products/collectCategories';
import {JSX} from 'react';

type Props = {
	slug: string;
};

export async function generateMetadata({params}: {params: Promise<Props>}) {
	const url = `https://artmarketprint.by/search`;

	return {
		title: `Поиск`,

		alternates: {
			canonical: url,
		},
	};
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{
		query: string;
	}>;
}): Promise<JSX.Element> {
	const {query} = await searchParams;

	try {
		const products = await searchProductsByName(query);
		const categoriesWithSubcategories = collectCategoriesAndSubcategories(products);

		return (
			<Section>
				{Array.isArray(products) && products.length > 0 ? (
					<>
						<SectionTitle>{`Результаты поиска для "${query}" (${products.length} найдено)`}</SectionTitle>
						<div className="flex flex-col md:flex-row gap-2 w-full">
							<ProductSearchForm />
							<Link href="/products/categories/all">
								<Button className="border-1" radius="sm" variant="bordered">
									<ShoppingCartIcon size="18" />
									<span>Все товары</span>
								</Button>
							</Link>
						</div>
						<ProductsView products={products} categories={categoriesWithSubcategories} totalItemsView={20} showFilter={true} />
					</>
				) : (
					<div className="flex flex-col items-center gap-8">
						<Card className="lg:flex-row gap-8 self-stretch items-center p-4 w-fit mx-auto">
							<div>
								<CardHeader>
									<p className="text-3xl font-bold">{`Товар не найден`}</p>
								</CardHeader>
								<CardBody className="prose text-balance text-slate-500 block">
									<p>
										К сожалению, мы не нашли товаров по запросу <span className="font-bold">&quot;{`${query}`}&quot;</span>
									</p>
									<p>Рекомендуем:</p>
									<ul>
										<li>Проверьте правильность написания запроса</li>
										<li>Попробуйте использовать другие ключевые слова</li>
										<li>
											Проверьте наличие товара в{' '}
											<Link href="/products/categories/all" className="text-primary">
												каталоге
											</Link>
										</li>
									</ul>
								</CardBody>
								<CardFooter className="gap-4 lg:flex-row flex-col items-stretch">
									<Link href="/products/categories/all">
										<Button className="uppercase font-semibold" color="primary" variant="ghost" radius="sm">
											<SearchXIcon className="w-6 h-6" />
											<span>Очистить поиск</span>
										</Button>
									</Link>
									<Link href="/">
										<Button color="primary" radius="sm" className="bg-brand-gradient uppercase font-semibold">
											<PanelRightOpenIcon className="w-6 h-6" />
											На главную
										</Button>
									</Link>
								</CardFooter>
							</div>

							<ShoppingCart size={320} className="hidden lg:block m-4" />
						</Card>
						<div className="mt-10">
							<FeaturedProducts />
						</div>
					</div>
				)}
			</Section>
		);
	} catch (error) {
		console.error('Error fetching products:', error);

		return (
			<Section>
				<div className="text-center py-10">
					<h2 className="text-2xl font-bold mb-4">Произошла ошибка при загрузке результатов поиска</h2>
					<p className="text-slate-500 mb-6">Пожалуйста, попробуйте обновить страницу или повторить попытку позже.</p>
					<Link href="/" className="bg-brand-gradient uppercase font-semibold">
						На главную
					</Link>
				</div>
			</Section>
		);
	}
}
