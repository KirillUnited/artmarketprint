import {JSX, Suspense} from 'react';
import {clsx} from 'clsx';

import {
	CATEGORY_WITH_AVAILABLE_SUBCATEGORIES_QUERY,
	getAllProductColorsQuery,
	getAllProductMaterials,
	getCategoriesWithProductsQuery,
	getTotalProductsQuery,
} from '@/components/shared/product/lib/queries';
import {CategoryFilter, ClientPagination, ProductListContainer} from '@/components/shared/product/ui/';
import Section, {SectionTitle} from '@/components/layout/Section';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import Loader from '@/components/ui/Loader';
import {LightBreadcrumb} from '@/components/ui/Breadcrumb';
import {SubCategoryFilter} from '@/components/shared/product/ui';
import {ProductFilter} from '@/components/shared/product';

const PRODUCTS_PER_PAGE = 20;
const BASE_URL = '/products/categories';

type Props = {
	category: string;
};

export async function generateMetadata({params}: {params: Promise<Props>}) {
	const {category} = await params;
	const categorySlug =
		category === 'all'
			? null
			: await sanityFetch({
					query: CATEGORY_WITH_AVAILABLE_SUBCATEGORIES_QUERY,
					params: {
						slug: category,
					},
				});
	const title = categorySlug?.title || 'Все категории';
	const description = categorySlug?.description || 'Каталог всех категорий товаров';

	return {
		title,
		description,
	};
}

export default async function ProductsCategoryPage({
	params,
	searchParams,
}: {
	params: Promise<Props>;
	searchParams: Promise<{page?: string; sub?: string | string[]; sort?: string; material?: string; color?: string}>;
}): Promise<JSX.Element> {
	const {category} = await params;
	const {page, sub, sort, material, color} = await searchParams;
	const categorySlug =
		category === 'all'
			? null
			: await sanityFetch({
					query: CATEGORY_WITH_AVAILABLE_SUBCATEGORIES_QUERY,
					params: {
						slug: category,
					},
				});
	const subValue = Array.isArray(sub) ? sub.join(',') : sub || '';
	const activeSubcategorySlugs = subValue
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean);
	const activeSubcategories = categorySlug?.subcategories?.filter((s: any) => activeSubcategorySlugs.includes(s.slug)) || [];
	const singleActiveSubcategory = activeSubcategories.length === 1 ? activeSubcategories[0] : null;
	const [total, categories, allProductMaterials, allProductColors] = await Promise.all([
		sanityFetch({
			query: getTotalProductsQuery,
			params: {
				categoryTitle: categorySlug?.title || null,
				subcategoryTitles: activeSubcategories.length > 0 ? activeSubcategories.map((s: any) => s.title) : null,
				material: material || null,
				color: color || null,
			},
		}),
		sanityFetch({query: getCategoriesWithProductsQuery}),
		sanityFetch({query: getAllProductMaterials}),
		sanityFetch({query: getAllProductColorsQuery(categorySlug, activeSubcategories)}),
	]);
	const pageNumber = parseInt(page || '1');
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
	const activeCategory = singleActiveSubcategory?.title || categorySlug?.title;
	const hasActiveFilters = Boolean(sort || material || color || activeSubcategorySlugs.length > 0);
	const productsListKey = [category, pageNumber, sort || '', material || '', color || '', activeSubcategorySlugs.join(',')].join('|');

	console.log(categorySlug)

	return (
		<Section className="space-y-6 bg-gray-50">
			<SectionTitle>Каталог товаров</SectionTitle>
			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<p className="text-lg font-semibold">Категории</p>
				</div>

				<CategoryFilter active={category} baseUrl={BASE_URL} categories={categories} />
			</div>

			<LightBreadcrumb baseUrl={BASE_URL} category={categorySlug} subcategory={singleActiveSubcategory || undefined} />

			<h1 className="text-3xl font-semibold">
				{activeCategory || 'Все категории'} <span className="truncate text-sm font-light text-gray-600">{`${total} шт.`}</span>
			</h1>
			<div className={clsx('grid gap-8', activeCategory && 'md:grid-cols-[270px_1fr]')}>
				{activeCategory && <SubCategoryFilter activeSubcategory={activeSubcategories} baseUrl={BASE_URL} category={categorySlug} categorySlug={category} />}
				<div className="flex flex-col gap-8">
					<ProductFilter allProductColors={allProductColors} allProductMaterials={allProductMaterials} />
					<Suspense
						key={productsListKey}
						fallback={
							<div className="flex min-h-40 items-center justify-center py-8">
								<Loader className="static" label={hasActiveFilters ? 'Применяем фильтры...' : 'Загрузка товаров...'} size="lg" variant="spinner" />
							</div>
						}
					>
						<ProductListContainer
							PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}
							categorySlug={categorySlug}
							color={color || null}
							material={material || null}
							pageNumber={pageNumber}
							sort={sort || null}
							subcategorySlug={activeSubcategories}
						/>
					</Suspense>
				</div>
			</div>
			{totalPages > 1 && <ClientPagination basePath={`${BASE_URL}/${category}`} pageNumber={pageNumber} totalPages={totalPages} />}
		</Section>
	);
}
