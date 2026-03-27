import { JSX, Suspense } from 'react';
import { clsx } from 'clsx';

import { getTotalProductsQuery, getCategoriesQuery, CATEGORY_QUERY, getAllProductMaterials, getAllProductColors } from '@/components/shared/product/lib/queries';
import { CategoryFilter, ClientPagination, ColorFilter, MaterialFilter, ProductList } from '@/components/shared/product/ui/';
import Section from '@/components/layout/Section';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import Loader from '@/components/ui/Loader';
import { LightBreadcrumb } from '@/components/ui/Breadcrumb';
import { SortSelect, SubCategoryFilter } from '@/components/shared/product/ui';
import ProductSearchForm from '@/components/shared/product/ProductSearchForm';
import styles from '@/components/shared/product/ui/styles.module.css';

const PRODUCTS_PER_PAGE = 20;
const BASE_URL = '/products/categories';

type Props = {
	category: string;
};

export async function generateMetadata({ params }: { params: Promise<Props> }) {
	const { category } = await params;
	const categorySlug =
		category === 'all'
			? null
			: await sanityFetch({
				query: CATEGORY_QUERY,
				params: {
					slug: category,
				},
			});
	const title = categorySlug?.title || 'Все категории';
	const description = categorySlug?.description || 'Каталог всех категорий товаров';

	return {
		title,
		description
	};
}

export default async function ProductsCategoryPage({
	params,
	searchParams,
}: {
	params: Promise<Props>;
	searchParams: Promise<{ page?: string; sub?: string; sort?: string; material?: string; color?: string }>;
}): Promise<JSX.Element> {
	const { category } = await params;
	const { page, sub, sort, material, color } = await searchParams;
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
	const [total, categories, allProductMaterials, allProductColors] = await Promise.all([
		sanityFetch({ query: getTotalProductsQuery(categorySlug, activeSubcategory || null, material || null, color || null) }),
		sanityFetch({ query: getCategoriesQuery }),
		sanityFetch({ query: getAllProductMaterials }),
		sanityFetch({ query: getAllProductColors }),
	]);
	const pageNumber = parseInt(page || '1');
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
	const activeCategory = activeSubcategory?.title || categorySlug?.title;

	return (
		<Section className="space-y-6">
			<LightBreadcrumb baseUrl={BASE_URL} category={categorySlug} subcategory={activeSubcategory} />

			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<p className="font-semibold text-lg">Каталог</p>
				</div>

				<CategoryFilter active={category} baseUrl={BASE_URL} categories={categories} />
			</div>

			<h1 className="text-3xl font-semibold">
				{activeCategory || 'Все категории'} <span className="text-sm font-light text-gray-600 truncate">{`${total} шт.`}</span>
			</h1>
			<div className={clsx('grid gap-4', activeCategory && 'md:grid-cols-[270px_1fr]')}>
				{activeCategory && <SubCategoryFilter activeSubcategory={activeSubcategory} baseUrl={BASE_URL} category={categorySlug} categorySlug={category} />}
				<div className="flex flex-col gap-4">
					<div className={clsx(styles.ProductFilter)}>
						<ProductSearchForm />
						<SortSelect />
						<MaterialFilter materials={allProductMaterials} />
						<ColorFilter colors={allProductColors} />
					</div>
					<Suspense fallback={<Loader className="static" label="Загрузка товаров..." size="lg" variant="spinner" />}>
						<ProductList
							PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}
							categorySlug={categorySlug}
							color={color || null}
							material={material || null}
							pageNumber={pageNumber}
							sort={sort || null}
							subcategorySlug={activeSubcategory}
						/>
					</Suspense>
				</div>
			</div>
			{totalPages > 1 && <ClientPagination basePath={`${BASE_URL}/${category}`} pageNumber={pageNumber} totalPages={totalPages} />}
		</Section>
	);
}
