// app/products/[category]/page.tsx
import {getProductsQuery, getTotalProductsQuery, getCategoriesQuery} from '@/components/shared/product/lib/queries';
import {ProductCard} from '@/components/shared/product/ui';
import {Pagination} from '@/components/shared/product/ui';
import {CategoryFilter} from '@/components/shared/product/ui';
import {sanityFetch} from "@/sanity/lib/sanityFetch";

const PRODUCTS_PER_PAGE = 20;

type Props = {
	category: string;
};

export default async function ProductsCategoryPage({params, searchParams}: { params: Promise<Props>, searchParams: Promise<{page?: string}>
 }) {
	const {category} = await params;
	const {page} = await searchParams;
	const pageNumber = parseInt(page || '1');
	const categorySlug = category === 'all' ? null : category;

	const [products, total, categories] = await Promise.all([
		sanityFetch({query: getProductsQuery(categorySlug, pageNumber, PRODUCTS_PER_PAGE), params: {}}),

		sanityFetch({query: getTotalProductsQuery(categorySlug)}),
		sanityFetch({query: getCategoriesQuery}),
	]);

	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<div className="p-6 space-y-6">
			<CategoryFilter categories={categories} active={category} />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
				{products.map((product: any) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			<Pagination current={pageNumber} total={totalPages} basePath={`/products/categories/${category}`} />
		</div>
	);
}
