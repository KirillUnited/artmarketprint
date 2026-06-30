import {JSX, Suspense} from 'react';
import {clsx} from 'clsx';
import {redirect} from 'next/navigation';

import {
	CATEGORY_QUERY,
	getAllProductColorsQuery,
	getAllProductMaterials,
	getAvailableProductSubcategoriesByCategoryQuery,
	getTotalProductsQuery,
} from '@/components/shared/product/lib/queries';
import {
	decodeUrlSegment,
	encodeUrlSegment,
	getActiveCategoryImageUrl,
	getCachedProductCategorySources,
	toProductCategory,
	toSubcategory,
	toUniqueProductCategories,
	type ProductCategory,
	type Subcategory,
} from '@/components/shared/product/lib/category-page-data';
import {CategoryFilter, ClientPagination, ProductListContainer} from '@/components/shared/product/ui/';
import Section, {SectionTitle} from '@/components/layout/Section';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import Loader from '@/components/ui/Loader';
import {LightBreadcrumb} from '@/components/ui/Breadcrumb';
import {SubCategoryFilter} from '@/components/shared/product/ui';
import {ProductFilter} from '@/components/shared/product';
import { PRODUCTS_CATEGORIES_SEO } from '@/config/products';

const PRODUCTS_PER_PAGE = 20;
const BASE_URL = '/products/categories';

type Props = {
	category: string;
};

export async function generateMetadata({params}: {params: Promise<Props>}) {
	const {category} = await params;
	const activeCategoryTitle = category === 'all' ? null : decodeUrlSegment(category);
	const categorySEO = PRODUCTS_CATEGORIES_SEO.find((c) => c.H1 === activeCategoryTitle);
	const title = categorySEO?.title || 'Каталог сувенирной продукции и товаров с логотипом в Минске';
	const description = categorySEO?.description || 'Широкий ассортимент сувениров, одежды и аксессуаров для брендирования в Минске. ✓ Выгодные цены. ✓ Доставка по РБ. Создайте свой фирменный стиль вместе с ArtMarketPrint.';
	const productCategorySources = await getCachedProductCategorySources();
	const categories = toUniqueProductCategories(productCategorySources);
	const categoryImageUrl = getActiveCategoryImageUrl(categories, activeCategoryTitle);

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			...(categoryImageUrl ? {images: [{url: categoryImageUrl}]} : {}),
		},
		twitter: {
			card: categoryImageUrl ? 'summary_large_image' : 'summary',
			title,
			description,
			...(categoryImageUrl ? {images: [categoryImageUrl]} : {}),
		},
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
	const productCategorySources = await getCachedProductCategorySources();
	const categories = toUniqueProductCategories(productCategorySources);
	const productCategoryTitleSet = new Set(categories.map((cat) => cat.title));
	const decodedCategory = category === 'all' ? null : decodeUrlSegment(category);
	const activeCategoryTitle =
		decodedCategory && productCategoryTitleSet.has(decodedCategory) ? decodedCategory : null;

	const availableSubcategoryValues: string[] =
		activeCategoryTitle
			? await sanityFetch({
					query: getAvailableProductSubcategoriesByCategoryQuery,
					params: {
						categoryTitle: activeCategoryTitle,
					},
				})
			: [];

	if (category !== 'all' && decodedCategory && !productCategoryTitleSet.has(decodedCategory)) {
		const legacyCategory = await sanityFetch({
			query: CATEGORY_QUERY,
			params: {
				slug: category,
			},
		});

		if (legacyCategory?.title) {
			redirect(`${BASE_URL}/${encodeUrlSegment(legacyCategory.title)}`);
		}
	}

	const visibleSubcategories: Subcategory[] = (availableSubcategoryValues || [])
		.map((value) => value?.toString().trim())
		.filter(Boolean)
		.map(toSubcategory);

	const subValue = Array.isArray(sub) ? sub.join(',') : sub || '';
	const requestedSubcategorySlugs = subValue
		.split(',')
		.map((value) => value.trim())
		.filter(Boolean);
	const visibleSubcategorySlugSet = new Set(visibleSubcategories.map((subcategory) => subcategory.slug));
	const activeSubcategorySlugs = requestedSubcategorySlugs.filter((slug) => visibleSubcategorySlugSet.has(slug));
	const activeSubcategories = visibleSubcategories.filter((subcategory) => activeSubcategorySlugs.includes(subcategory.slug));
	const subcategoryLabels = Object.fromEntries(
		visibleSubcategories.map((subcategory) => [subcategory.slug, subcategory.title])
	);
	const singleActiveSubcategory = activeSubcategories.length === 1 ? activeSubcategories[0] : null;
	const [total, allProductMaterials, allProductColors] = await Promise.all([
		sanityFetch({
			query: getTotalProductsQuery,
			params: {
				categoryTitle: activeCategoryTitle,
				subcategoryTitles: activeSubcategories.length > 0 ? activeSubcategories.map((s: any) => s.title) : null,
				material: material || null,
				color: color || null,
			},
		}),
		sanityFetch({query: getAllProductMaterials}),
		sanityFetch({query: getAllProductColorsQuery(activeCategoryTitle, activeSubcategories)}),
	]);
	const visibleCategories = categories || [];
	const pageNumber = parseInt(page || '1');
	const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
	const activeCategory = singleActiveSubcategory?.title || activeCategoryTitle;
	const activeCategorySlug = activeCategoryTitle ? encodeUrlSegment(activeCategoryTitle) : 'all';
	const breadcrumbCategory: ProductCategory | undefined = activeCategoryTitle
		? categories.find((cat) => cat.title === activeCategoryTitle) ?? toProductCategory(activeCategoryTitle)
		: undefined;
	const hasActiveFilters = Boolean(sort || material || color || activeSubcategorySlugs.length > 0);
	const productsListKey = [activeCategorySlug, pageNumber, sort || '', material || '', color || '', activeSubcategorySlugs.join(',')].join('|');

	return (
		<Section className="space-y-6 bg-gray-50">
			<LightBreadcrumb baseUrl={BASE_URL} category={breadcrumbCategory} subcategory={singleActiveSubcategory || undefined} />
			<SectionTitle>Каталог товаров</SectionTitle>
			<div className="space-y-4">
				<div className="flex items-center justify-between gap-4">
					<p className="text-lg font-semibold">Категории</p>
				</div>

				<CategoryFilter active={activeCategorySlug} baseUrl={BASE_URL} categories={visibleCategories} />
			</div>


			<h1 className="text-3xl font-semibold">
				{activeCategory || 'Все категории'} <span className="truncate text-sm font-light text-gray-600">{`${total} шт.`}</span>
			</h1>
			<div className={clsx('grid gap-8', visibleSubcategories.length > 0 && 'md:grid-cols-[270px_1fr]')}>
				{visibleSubcategories.length > 0 && (
					<SubCategoryFilter
						activeSubcategory={activeSubcategories}
						baseUrl={BASE_URL}
						categorySlug={activeCategorySlug}
						subcategories={visibleSubcategories}
					/>
				)}
				<div className="flex flex-col gap-8">
					<ProductFilter allProductColors={allProductColors} allProductMaterials={allProductMaterials} subcategoryLabels={subcategoryLabels} />
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
							categorySlug={activeCategoryTitle}
							color={color || null}
							material={material || null}
							pageNumber={pageNumber}
							sort={sort || null}
							subcategorySlug={activeSubcategories}
						/>
					</Suspense>
				</div>
			</div>
			{totalPages > 1 && <ClientPagination basePath={`${BASE_URL}/${activeCategorySlug}`} pageNumber={pageNumber} totalPages={totalPages} />}
		</Section>
	);
}
