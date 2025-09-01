import { getTotalProductsQuery, getCategoriesQuery, CATEGORY_QUERY } from '@/components/shared/product/lib/queries';
import { CategoryFilter, ClientPagination, ProductList } from '@/components/shared/product/ui/';
import Section from '@/components/layout/Section';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { JSX, Suspense } from "react";
import Loader from "@/components/ui/Loader";
import {LightBreadcrumb} from '@/components/ui/Breadcrumb';
import {SubCategoryFilter} from "@/components/shared/product/ui";

const PRODUCTS_PER_PAGE = 20;
const BASE_URL = '/products/categories';

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
			<CategoryFilter categories={categories} active={category} baseUrl={BASE_URL} />

			<LightBreadcrumb category={categorySlug} subcategory={activeSubcategory} baseUrl={BASE_URL} />

			<h1 className='text-3xl font-bold'>{categorySlug?.title || 'Каталог'}</h1>
			<div className='grid md:grid-cols-[270px,1fr] gap-4'>
				<SubCategoryFilter category={categorySlug} categorySlug={category} activeSubcategory={activeSubcategory} baseUrl={BASE_URL} />
				<Suspense fallback={<Loader size='lg' variant='spinner' label='Загрузка товаров...' className='static' />}>
					<ProductList categorySlug={categorySlug} subcategorySlug={activeSubcategory} pageNumber={pageNumber} PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE} />
				</Suspense>
			</div>
			{totalPages > 1 && <ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`${BASE_URL}/${category}`} />}
		</Section>
	);
}
