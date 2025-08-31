import { getTotalProductsQuery, getCategoriesQuery, CATEGORY_QUERY } from '@/components/shared/product/lib/queries';
import { CategoryFilter, ClientPagination, ProductList } from '@/components/shared/product/ui/';
import Section from '@/components/layout/Section';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { JSX, Suspense } from "react";
import Loader from "@/components/ui/Loader";
import Link from 'next/link';
import clsx from 'clsx';

const PRODUCTS_PER_PAGE = 20;

type Props = {
	category: string;
};

export default async function ProductsCategoryPage({ params, searchParams }: { params: Promise<Props>; searchParams: Promise<{ page?: string, sub?: string }> }): Promise<JSX.Element> {
	const { category } = await params;
	const { page, sub } = await searchParams;
	const categorySlug =
		category === 'all'
			? null
			: await sanityFetch({
				query: CATEGORY_QUERY,
				params: {
					slug: category,
				},
			});
	const activeSubcategory = categorySlug?.subcategories?.find((s: any) => s.slug === sub);
	const [total, categories] = await Promise.all([
		sanityFetch({ query: getTotalProductsQuery(categorySlug, activeSubcategory || null) }),
		sanityFetch({ query: getCategoriesQuery }),
	]);
	const pageNumber = parseInt(page || '1');
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<Section className="space-y-6">
			<CategoryFilter categories={categories} active={category} />
			<h1 className='text-3xl font-bold'>{categorySlug?.title || 'Каталог'}</h1>
			<div className='grid md:grid-cols-[270px,1fr] gap-4'>
				<div className="flex flex-col gap-2">
					<p className="font-semibold text-lg">Категории</p>
					<ul>
						{
							categorySlug?.subcategories?.map((sub: any) => (
								<li key={sub.slug}>
									<Link 
									className={clsx(
										'hover:underline hover:text-primary',
										{ 'font-bold text-primary': activeSubcategory?.slug === sub.slug }
									)} 
									href={`/products/categories/${category}?sub=${sub.slug}`}>{sub.title}</Link>
								</li>
							))
						}
					</ul>
				</div>
				<Suspense fallback={<Loader size='lg' variant='spinner' label='Загрузка товаров...' className='static' />}>
					<ProductList categorySlug={categorySlug} subcategorySlug={activeSubcategory} pageNumber={pageNumber} PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE} />
				</Suspense>
			</div>
			{totalPages > 1 && <ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`/products/categories/${category}`} />}
		</Section>
	);
}
