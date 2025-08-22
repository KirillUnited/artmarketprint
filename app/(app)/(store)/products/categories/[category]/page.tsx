import {getProductsQuery, getTotalProductsQuery, getCategoriesQuery, CATEGORY_QUERY} from '@/components/shared/product/lib/queries';
import {CategoryFilter} from '@/components/shared/product/ui';
import {ClientPagination} from "@/components/shared/product/ui";
import ProductThumb from '@/components/shared/product/ProductThumb';
import Section from '@/components/layout/Section';
import {sanityFetch} from '@/sanity/lib/sanityFetch';

const PRODUCTS_PER_PAGE = 20;

type Props = {
	category: string;
};

export default async function ProductsCategoryPage({params, searchParams}: {params: Promise<Props>; searchParams: Promise<{page?: string}>}) {
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

	const [products, total, categories] = await Promise.all([
		sanityFetch({query: getProductsQuery(categorySlug, pageNumber, PRODUCTS_PER_PAGE), params: {}}),
		sanityFetch({query: getTotalProductsQuery(categorySlug)}),
		sanityFetch({query: getCategoriesQuery}),
	]);

	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<Section className="space-y-6">
			<CategoryFilter categories={categories} active={category} />
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
				{products.map((product: any) => (
					<ProductThumb key={product._id} item={product} />
				))}
			</div>
			<ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`/products/categories/${category}`} />
		</Section>
	);
}
