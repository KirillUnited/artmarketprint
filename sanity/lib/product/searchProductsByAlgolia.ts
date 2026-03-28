import type { SearchResponse } from '@algolia/client-search';

import type { ProductData } from '@/components/shared/product/product.types';
import { createAlgoliaSearchClient } from '@/lib/algolia-client';
import { SEARCH_CONFIG } from '@/lib/search-config';
import { searchProductsByName } from '@/sanity/lib/product/searchProductsByName';

type AlgoliaProductHit = {
  objectID: string;
  id?: string | number;
  name?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  brand?: string;
  price?: number | string;
  stock?: number | string;
  materials?: string[];
  colors?: string[];
  sizes?: string[];
  imageUrl?: string;
  url?: string;
  updatedAt?: string;
};

type AlgoliaSearchResult = {
  products: ProductData[];
  totalFound: number;
  totalPages: number;
  currentPage: number;
};

const DEFAULT_IMAGE = '/images/product-no-image.jpg';

const getAlgoliaIndexName = () =>
  process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX || SEARCH_CONFIG.INDEX_NAME;

const hasAlgoliaSearchConfig = () =>
  Boolean(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);

const mapAlgoliaHitToProduct = (hit: AlgoliaProductHit): ProductData => {
  const image = typeof hit.imageUrl === 'string' && hit.imageUrl.trim() !== '' ? hit.imageUrl : DEFAULT_IMAGE;
  const id = String(hit.id ?? hit.objectID ?? '');
  const price =
    typeof hit.price === 'number'
      ? hit.price
      : typeof hit.price === 'string'
        ? Number(hit.price) || 0
        : 0;
  const stock =
    typeof hit.stock === 'number'
      ? String(hit.stock)
      : typeof hit.stock === 'string'
        ? hit.stock
        : '';

  return {
    _id: String(hit.objectID ?? id),
    id,
    name: hit.name ?? '',
    price,
    image,
    images: [],
    images_urls: image,
    description: hit.description ?? '',
    variation_description: '',
    category: hit.category ?? '',
    subcategory: hit.subcategory ?? '',
    colors: Array.isArray(hit.colors) ? hit.colors : [],
    sizes: Array.isArray(hit.sizes) ? hit.sizes : [],
    quantity: 0,
    items: [],
    stock,
    sku: hit.sku ?? '',
    brand: hit.brand ?? '',
  };
};

const runAlgoliaSearch = async (
  query: string,
  page: number,
  hitsPerPage: number,
): Promise<SearchResponse<AlgoliaProductHit>> => {
  const client = createAlgoliaSearchClient();
  const indexName = getAlgoliaIndexName();

  return client.searchSingleIndex<AlgoliaProductHit>({
    indexName,
    searchParams: {
      query,
      page: Math.max(0, page - 1),
      hitsPerPage,
    },
  });
};

export async function searchProductsByAlgolia(
  searchParam: string,
  page: number,
  hitsPerPage: number = SEARCH_CONFIG.HITS_PER_PAGE,
): Promise<AlgoliaSearchResult> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  if (!hasAlgoliaSearchConfig()) {
    console.warn('Algolia search is not configured. Falling back to Sanity search.');
    const products = await searchProductsByName(searchParam);
    const totalFound = Array.isArray(products) ? products.length : 0;
    const totalPages = Math.max(1, Math.ceil(totalFound / hitsPerPage));
    const pageToUse = Math.min(safePage, totalPages);
    const start = (pageToUse - 1) * hitsPerPage;
    const paginatedProducts = Array.isArray(products)
      ? products.slice(start, start + hitsPerPage)
      : [];

    return {
      products: paginatedProducts as ProductData[],
      totalFound,
      totalPages,
      currentPage: pageToUse,
    };
  }

  const response = await runAlgoliaSearch(searchParam, safePage, hitsPerPage);
  const totalFound = typeof response.nbHits === 'number' ? response.nbHits : 0;
  const totalPages = typeof response.nbPages === 'number' ? response.nbPages : 0;

  if (totalPages > 0 && safePage > totalPages) {
    const fallbackResponse = await runAlgoliaSearch(searchParam, totalPages, hitsPerPage);
    return {
      products: fallbackResponse.hits.map(mapAlgoliaHitToProduct),
      totalFound,
      totalPages,
      currentPage: totalPages,
    };
  }

  return {
    products: response.hits.map(mapAlgoliaHitToProduct),
    totalFound,
    totalPages,
    currentPage: safePage,
  };
}
