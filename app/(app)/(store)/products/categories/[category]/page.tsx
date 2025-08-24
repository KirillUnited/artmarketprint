import {getTotalProductsQuery, getCategoriesQuery, CATEGORY_QUERY} from '@/components/shared/product/lib/queries';
import {CategoryFilter, ClientPagination, ProductList} from '@/components/shared/product/ui/';
import Section from '@/components/layout/Section';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {JSX, Suspense} from "react";
import Loader from "@/components/ui/Loader";

const PRODUCTS_PER_PAGE = 20;

type Props = {
	category: string;
};

export default async function ProductsCategoryPage({params, searchParams}: {params: Promise<Props>; searchParams: Promise<{page?: string}>}): Promise<JSX.Element> {
	const {category} = await params;
	const {page} = await searchParams;
	const categorySlug =
		category === 'all'
			? null
			: await sanityFetch({
					query: CATEGORY_QUERY,
					params: {
						slug: category,
					},
				});
	const pageNumber = parseInt(page || '1');

	const [total, categories] = await Promise.all([
		sanityFetch({query: getTotalProductsQuery(categorySlug)}),
		sanityFetch({query: getCategoriesQuery}),
	]);

	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<Section className="space-y-6">
			<CategoryFilter categories={categories} active={category} />
			<Suspense fallback={<Loader size='lg' variant='spinner' label='Загрузка товаров...' className='static' />}>
				<ProductList categorySlug={categorySlug} pageNumber={pageNumber} PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}/>
			</Suspense>
			<ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`/products/categories/${category}`} />
		</Section>
	);
}
