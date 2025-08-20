// app/products/[category]/page.tsx
import {getProductsQuery, getTotalProductsQuery, getCategoriesQuery} from '@/components/shared/product/lib/queries';
import {ProductCard} from '@/components/shared/product/ui';
import {Pagination} from '@/components/shared/product/ui';
import {CategoryFilter} from '@/components/shared/product/ui';
import {sanityFetch} from "@/sanity/lib/sanityFetch";

const PRODUCTS_PER_PAGE = 20;

type Props = {
	params: {category: string};
	searchParams: {page?: string};
};

export default async function ProductsCategoryPage({params, searchParams}: Props) {
	const page = parseInt(searchParams.page || '1');
	const categorySlug = params.category === 'all' ? null : params.category;

	const [products, total, categories] = await Promise.all([
		sanityFetch({query: getProductsQuery(categorySlug, page, PRODUCTS_PER_PAGE), params: {}}),
		sanityFetch({query: getTotalProductsQuery(categorySlug)}),
		sanityFetch({query: getCategoriesQuery}),
	]);

	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<div className="p-6 space-y-6">
			<CategoryFilter categories={categories} active={params.category} />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{products.map((product: any) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			<Pagination current={page} total={totalPages} basePath={`/products/categories/${params.category}`} />
		</div>
	);
}
