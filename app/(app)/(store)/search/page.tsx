import {JSX} from 'react';

import Section from '@/components/layout/Section';
import {ProductData} from '@/components/shared/product/product.types';
import {SearchEmptyQueryState, SearchErrorState, SearchNotFoundState, SearchResultsState} from '@/components/shared/product/search';
import {searchProductsByAlgolia} from '@/sanity/lib/product/searchProductsByAlgolia';

const PRODUCTS_PER_PAGE = 20;

export async function generateMetadata() {
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/search`;

	return {
		title: 'Поиск',

		alternates: {
			canonical: url,
		},
	};
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{
		query?: string;
		page?: string;
		sort?: string;
		material?: string;
		color?: string;
	}>;
}): Promise<JSX.Element> {
	const {
		query: rawQuery,
		page: rawPage,
		sort: rawSort,
		material: rawMaterial,
		color: rawColor,
	} = await searchParams;
	const query = (rawQuery ?? '').trim();
	const pageParam = Number.parseInt(rawPage ?? '1', 10);
	const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
	const sort = (rawSort ?? '').trim() || null;
	const material = (rawMaterial ?? '').trim() || null;
	const color = (rawColor ?? '').trim() || null;

	try {
		if (query === '') {
			return (
				<Section>
					<SearchEmptyQueryState />
				</Section>
			);
		}

		const {products, totalFound, totalPages, currentPage: resolvedPage} = await searchProductsByAlgolia(
			query,
			currentPage,
			PRODUCTS_PER_PAGE,
			{
				sort,
				material,
				color,
			}
		);

		if (Array.isArray(products) && products.length > 0) {
			const page = totalPages > 0 ? Math.min(resolvedPage, totalPages) : resolvedPage;

			return (
				<Section>
					<SearchResultsState
						currentPage={page}
						products={products as ProductData[]}
						query={query}
						totalFound={totalFound}
						totalPages={Math.max(1, totalPages)}
					/>
				</Section>
			);
		}

		return (
			<Section>
				<SearchNotFoundState query={query} />
			</Section>
		);
	} catch (error) {
		console.error('Error fetching products:', error);

		return (
			<Section>
				<SearchErrorState />
			</Section>
		);
	}
}
