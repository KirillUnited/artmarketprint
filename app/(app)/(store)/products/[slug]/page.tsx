import {Card, CardBody, CardFooter} from '@heroui/card';

import Section from '@/components/layout/Section';
import {ProductCarousel, ProductDetails, ProductStock} from '@/components/shared/product';
import RelatedProducts from '@/components/shared/product/RelatedProducts';
import getProductBySlug from '@/sanity/lib/product/getProductBySlug';
import {getPrice} from '@/lib/getPrice';
import {NAVIGATION_QUERY} from '@/sanity/lib/queries';
import AddToBasketButton from '@/components/ui/AddToBasketButton';
import ProductPrice from '@/components/shared/product/ProductPrice';
import {getSanityDocuments} from '@/sanity/lib/fetch-sanity-data';
import {ProductTabs} from '@/components/shared/product/ProductTabs';
import {ProductBreadcrumb} from '@/components/ui/Breadcrumb';
import {OrderForm} from '@/components/ui/form';
import clsx from 'clsx';

export interface Props {
	slug: string;
	id?: number;
}

export const generateMetadata = async ({params}: {params: Promise<Props>}) => {
	const {slug} = await params;
	const product: any = await getProductBySlug(slug);

	const url = `https://artmarketprint.by/products/${slug}`;

	return {
		title: product.name,
		description: product.description,

		openGraph: {
			title: `${product.name}`,
			description: `${product.description}`,
			images: [`${product.image}`],
			type: 'website',
			locale: 'ru',
			siteName: 'Art Market Print',
			url: `https://artmarketprint.by/products/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: `${product.name}`,
			description: `${product.description}`,
			images: [`${product.image}`],
			creator: '@artmarketprint',
			site: '@artmarketprint',
			url: `https://artmarketprint.by/products/${slug}`,
		},
		alternates: {
			canonical: url,
		},
	};
};

export default async function ProductPage({params}: {params: Promise<Props>}) {
	const {slug} = await params;
	const [breadcrumbs, product] = await Promise.all([getSanityDocuments(NAVIGATION_QUERY), getProductBySlug(slug)]);

	if (!product)
		return (
			<Section>
				<div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
					<div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
					<h2 className="text-2xl font-medium text-gray-600">Товар не найден</h2>
					<p className="text-gray-500">Товар, который вы ищете, не существует или был удален.</p>
				</div>
			</Section>
		);

	const {id, name: productTitle = '', description: general_description = '', variation_description = '', price = [], colors, sizes, category, items, stock, sku} = (product as any) || {};

	return (
		<>
			<Section>
				<div className="flex flex-col gap-4">
					<ProductBreadcrumb category={category} title={productTitle} slug={slug} items={breadcrumbs[0].links} />

					<h1 className="text-2xl font-bold">
						{productTitle}
						{/*{sku && (*/}
						{/*    <span className="text-sm text-gray-600 ml-2 font-light">арт. {sku}</span>*/}
						{/*)}*/}
					</h1>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<ProductCarousel className="md:sticky top-16" items={product} />
					<div className="flex flex-col gap-4">
						<Card className="bg-indigo-100">
							<CardBody>
								<p className="my-0">
									<ProductPrice price={getPrice(price, 1.1)} productId={id} />
								</p>
								<ProductStock items={items} />
							</CardBody>
							<CardBody>
								<ProductDetails 
									items={items?.map((item: any) => ({
										id: item.id || item._id,
										color: item.color,
										cover: item.cover || '',
										// Use item.stock if available, otherwise fallback to the global stock
										stock: item.stock !== undefined ? Number(item.stock) : Number(stock)
									})) || []} 
									sizes={sizes || []} 
									colors={colors || []} 
									color={items?.[0]?.color || ''} 
									size={sizes?.[0] || ''} 
								/>
							</CardBody>
							{Number(stock) > 0 && (
								<CardFooter className="relative">
									<AddToBasketButton product={product as any} />
								</CardFooter>
							)}
						</Card>
						{Number(stock) === 0 && (
							<Card className={clsx('flex flex-col gap-6', 'p-4 bg-background')} radius="sm" shadow="sm">
								<div className="flex flex-col gap-2">
									<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">Оставить заявку</h3>
									<p>Оставьте заявку и мы свяжемся с Вами в ближайшее время</p>
								</div>
								<OrderForm className="w-full" />
							</Card>
						)}
					</div>
				</div>

				<ProductTabs description={general_description} options={variation_description} />
			</Section>
			<RelatedProducts product={product} />
		</>
	);
}
