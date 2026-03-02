import Section from '@/components/layout/Section';
import {ProductData} from '@/components/shared/product/product.types';
import {SearchEmptyQueryState, SearchErrorState, SearchNotFoundState, SearchResultsState} from '@/components/shared/product/search';
import {searchProductsByName} from '@/sanity/lib/product/searchProductsByName';
import {JSX} from 'react';

const PRODUCTS_PER_PAGE = 20;

export async function generateMetadata() {
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/search`;

	return {
		title: `Поиск`,

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
	}>;
}): Promise<JSX.Element> {
	const {query: rawQuery, page: rawPage} = await searchParams;
	const query = (rawQuery ?? '').trim();
	const pageParam = Number.parseInt(rawPage ?? '1', 10);
	const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

	try {
		if (query === '') {
			return (
				<Section>
					<SearchEmptyQueryState />
				</Section>
			);
		}

		const products = await searchProductsByName(query);
		if (Array.isArray(products) && products.length > 0) {
			const totalFound = products.length;
			const totalPages = Math.max(1, Math.ceil(totalFound / PRODUCTS_PER_PAGE));
			const page = Math.min(currentPage, totalPages);
			const start = (page - 1) * PRODUCTS_PER_PAGE;
			const paginatedProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

			return (
				<Section>
					<SearchResultsState
						query={query}
						products={paginatedProducts as ProductData[]}
						totalFound={totalFound}
						currentPage={page}
						totalPages={totalPages}
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
