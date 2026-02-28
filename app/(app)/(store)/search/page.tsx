import Section from '@/components/layout/Section';
import {Product} from '@/components/shared/product/product.types';
import {SearchEmptyQueryState, SearchErrorState, SearchNotFoundState, SearchResultsState} from '@/components/shared/product/search';
import {searchProductsByName} from '@/sanity/lib/product/searchProductsByName';
import {collectCategoriesAndSubcategories} from '@/lib/products/collectCategories';
import {JSX} from 'react';

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
	}>;
}): Promise<JSX.Element> {
	const {query: rawQuery} = await searchParams;
	const query = (rawQuery ?? '').trim();

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
			const categoriesWithSubcategories = collectCategoriesAndSubcategories(products) as Array<{category: string; subcategories: string[]}>;

			return (
				<Section>
					<SearchResultsState
						query={query}
						products={products as Product[]}
						categories={categoriesWithSubcategories}
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
