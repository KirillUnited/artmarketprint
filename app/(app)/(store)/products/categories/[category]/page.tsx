import {
	getTotalProductsQuery,
	getCategoriesQuery,
	CATEGORY_QUERY,
	getAllProductMaterials
} from '@/components/shared/product/lib/queries';
import {CategoryFilter, ClientPagination, MaterialFilter, ProductList} from '@/components/shared/product/ui/';
import Section from '@/components/layout/Section';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {JSX, Suspense} from 'react';
import Loader from '@/components/ui/Loader';
import {LightBreadcrumb} from '@/components/ui/Breadcrumb';
import {SortSelect, SubCategoryFilter} from '@/components/shared/product/ui';
import ProductSearchForm from '@/components/shared/product/ProductSearchForm';
import {clsx} from "clsx";
import styles from "@/components/shared/product/ui/styles.module.css";

const PRODUCTS_PER_PAGE = 20;
const BASE_URL = '/products/categories';

type Props = {
	category: string;
};

export default async function ProductsCategoryPage({
	params,
	searchParams,
}: {
	params: Promise<Props>;
	searchParams: Promise<{page?: string; sub?: string; sort?: string; material?: string}>;
}): Promise<JSX.Element> {
	const {category} = await params;
	const {page, sub, sort, material} = await searchParams;
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
	const [total, categories, allProductMaterials] = await Promise.all([
		sanityFetch({query: getTotalProductsQuery(categorySlug, activeSubcategory || null, material || null)}),
		sanityFetch({query: getCategoriesQuery}),
		sanityFetch({query: getAllProductMaterials}),
	]);
	const pageNumber = parseInt(page || '1');
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

	return (
		<Section className="space-y-6">
			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<p className="font-semibold text-3xl">Каталог</p>

					<ProductSearchForm className="max-w-sm" />
				</div>

				<CategoryFilter categories={categories} active={category} baseUrl={BASE_URL} />
			</div>

			<LightBreadcrumb category={categorySlug} subcategory={activeSubcategory} baseUrl={BASE_URL} />

			<h1 className="text-3xl font-bold">
				{activeSubcategory?.title || categorySlug?.title || 'Каталог'} <span className="text-sm font-light text-gray-600 truncate">{`${total} шт.`}</span>
			</h1>
			<div className="grid md:grid-cols-[270px,1fr] gap-4">
				<SubCategoryFilter category={categorySlug} categorySlug={category} activeSubcategory={activeSubcategory} baseUrl={BASE_URL} />
				<div className="space-y-4">
					<div className={clsx(styles.ProductFilter)}>
						{/* <SortSelect /> */}
						<MaterialFilter materials={allProductMaterials} />
					</div>
					<Suspense fallback={<Loader size="lg" variant="spinner" label="Загрузка товаров..." className="static" />}>
						<ProductList
							categorySlug={categorySlug}
							subcategorySlug={activeSubcategory}
							pageNumber={pageNumber}
							PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}
							sort={sort || null}
							material={material || null}
						/>
					</Suspense>
				</div>
			</div>
			{totalPages > 1 && <ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`${BASE_URL}/${category}`} />}
		</Section>
	);
}
