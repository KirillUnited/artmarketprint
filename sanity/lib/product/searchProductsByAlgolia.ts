import type { SearchResponse } from '@algolia/client-search';

import type { ProductData } from '@/components/shared/product/product.types';
import { createAlgoliaSearchClient } from '@/lib/algolia-client';
import { pickRelevantImageForQuery } from '@/lib/search/relevant-image';
import { SEARCH_CONFIG, SEARCH_PARAMETERS, RUSSIAN_SEARCH_CONFIG } from '@/lib/search-config';
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
  galleryImages?: string[];
  variantImagesByColor?: Record<string, string>;
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

type SearchProductsOptions = {
  sort?: string | null;
  material?: string | null;
  color?: string | null;
};

const DEFAULT_IMAGE = '/images/product-no-image.jpg';

const getAlgoliaIndexName = () =>
  process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX || SEARCH_CONFIG.INDEX_NAME;

const PRODUCT_RELEVANT_SEARCH_ATTRIBUTES = [
  'colors',
  'searchImageHints',
  'name',
  'sku',
  'materials',
  'category',
  'subcategory',
  'brand',
] as const;

const COLOR_BOOST_GROUPS = [
  ['белый', 'белая', 'белое', 'белые', 'white'],
  ['черный', 'черная', 'черное', 'черные', 'чёрный', 'чёрная', 'чёрное', 'чёрные', 'black'],
  ['серый', 'серая', 'серое', 'серые', 'grey', 'gray'],
  ['красный', 'красная', 'красное', 'красные', 'red'],
  ['синий', 'синяя', 'синее', 'синие', 'blue'],
  ['голубой', 'голубая', 'голубое', 'голубые', 'cyan'],
  ['зеленый', 'зеленая', 'зеленое', 'зеленые', 'зелёный', 'зелёная', 'зелёное', 'зелёные', 'green'],
  ['желтый', 'желтая', 'желтое', 'желтые', 'жёлтый', 'жёлтая', 'жёлтое', 'жёлтые', 'yellow'],
  ['оранжевый', 'оранжевая', 'оранжевое', 'оранжевые', 'orange'],
  ['розовый', 'розовая', 'розовое', 'розовые', 'pink'],
  ['фиолетовый', 'фиолетовая', 'фиолетовое', 'фиолетовые', 'purple', 'violet'],
  ['коричневый', 'коричневая', 'коричневое', 'коричневые', 'brown'],
  ['бежевый', 'бежевая', 'бежевое', 'бежевые', 'beige'],
] as const;

type ColorSearchIntent = {
  normalizedQuery: string;
  boostTokens: string[];
  filters: string;
  primaryToken: string;
};

const hasAlgoliaSearchConfig = () =>
  Boolean(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);

const mapAlgoliaHitToProduct = (hit: AlgoliaProductHit, searchQuery: string): ProductData => {
  const relevant = pickRelevantImageForQuery(hit, searchQuery);
  const image = typeof relevant.image === 'string' && relevant.image.trim() !== '' ? relevant.image : DEFAULT_IMAGE;
  const color = typeof relevant.color === 'string' && relevant.color.trim() !== '' ? relevant.color : '';
  const variantItems = Object.entries(hit.variantImagesByColor ?? {}).map(([variantColor, variantImage], index) => ({
    id: `${hit.objectID ?? hit.id ?? 'variant'}-${index}`,
    color: variantColor,
    cover: variantImage,
  }));
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
    activeColor: color,
    images: hit.galleryImages ?? [],
    images_urls: image,
    description: hit.description ?? '',
    variation_description: '',
    category: hit.category ?? '',
    subcategory: hit.subcategory ?? '',
    colors: Array.isArray(hit.colors) ? hit.colors : [],
    materials: Array.isArray(hit.materials) ? hit.materials : [],
    sizes: Array.isArray(hit.sizes) ? hit.sizes : [],
    quantity: 0,
    items: variantItems,
    stock,
    sku: hit.sku ?? '',
    brand: hit.brand ?? '',
  };
};

const normalizeToken = (value?: string | null) =>
  typeof value === 'string' ? value.trim().toLowerCase().replaceAll('ё', 'е') : '';

const QUERY_SPLIT_REGEX = /[\s,.;:!?/\\|()[\]{}"'+_-]+/;

const tokenizeQuery = (value: string): string[] =>
  value
    .split(QUERY_SPLIT_REGEX)
    .map((token) => normalizeToken(token))
    .filter((token) => token.length > 1);

const COLOR_TOKEN_TO_GROUP_INDEX = COLOR_BOOST_GROUPS.reduce<Map<string, number>>((acc, group, index) => {
  for (const token of group) {
    acc.set(normalizeToken(token), index);
  }
  return acc;
}, new Map<string, number>());

const getColorBoostTokens = (query: string): string[] => {
  const matchedGroups = new Set<number>();
  const tokens = tokenizeQuery(query);

  for (const token of tokens) {
    const groupIndex = COLOR_TOKEN_TO_GROUP_INDEX.get(token);
    if (groupIndex !== undefined) {
      matchedGroups.add(groupIndex);
    }
  }

  if (matchedGroups.size === 0) {
    return [];
  }

  const boostTokens = new Set<string>();
  for (const index of Array.from(matchedGroups)) {
    for (const token of COLOR_BOOST_GROUPS[index]) {
      boostTokens.add(normalizeToken(token));
    }
  }

  return Array.from(boostTokens);
};

const escapeFilterValue = (value: string): string => value.replaceAll('"', '\\"');

const getColorSearchIntent = (query: string): ColorSearchIntent | null => {
  const rawTokens = tokenizeQuery(query);
  const matchedGroups = new Set<number>();
  let firstMatchedGroupIndex: number | null = null;

  for (const token of rawTokens) {
    const groupIndex = COLOR_TOKEN_TO_GROUP_INDEX.get(token);
    if (groupIndex !== undefined) {
      matchedGroups.add(groupIndex);
      if (firstMatchedGroupIndex === null) {
        firstMatchedGroupIndex = groupIndex;
      }
    }
  }

  if (matchedGroups.size === 0) {
    return null;
  }

  const boostTokens = new Set<string>();
  for (const index of Array.from(matchedGroups)) {
    for (const token of COLOR_BOOST_GROUPS[index]) {
      boostTokens.add(normalizeToken(token));
    }
  }

  const nonColorTokens = rawTokens.filter((token) => COLOR_TOKEN_TO_GROUP_INDEX.get(token) === undefined);
  const normalizedQuery = nonColorTokens.join(' ').trim();

  const tokenFilters = Array.from(boostTokens).flatMap((token) => {
    const escapedToken = escapeFilterValue(token);
    return [`colors:"${escapedToken}"`, `searchImageHints:"${escapedToken}"`];
  });

  if (tokenFilters.length === 0) {
    return null;
  }

  return {
    normalizedQuery,
    boostTokens: Array.from(boostTokens),
    filters: `(${tokenFilters.join(' OR ')})`,
    primaryToken:
      firstMatchedGroupIndex === null
        ? normalizeToken(COLOR_BOOST_GROUPS[0][0])
        : normalizeToken(COLOR_BOOST_GROUPS[firstMatchedGroupIndex][0]),
  };
};

const includesColorToken = (value: string, token: string): boolean => {
  const normalizedValue = normalizeToken(value);
  if (normalizedValue === token) {
    return true;
  }

  const parts = normalizedValue
    .split(/[\/,;|]+/)
    .map((part) => part.trim())
    .filter((part) => part !== '');

  return parts.some((part) => part === token);
};

const applyColorPriority = (
  products: ProductData[],
  colorIntent?: ColorSearchIntent | null
): ProductData[] => {
  if (!colorIntent) {
    return products;
  }

  const token = colorIntent.primaryToken;
  return [...products].sort((a, b) => {
    const scoreA = getProductColorPriorityScore(a, token);
    const scoreB = getProductColorPriorityScore(b, token);
    return scoreB - scoreA;
  });
};

const getProductColorPriorityScore = (product: ProductData, token: string): number => {
  const normalizedName = normalizeToken(product.name);
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const exactSingleColor = colors.length === 1 && includesColorToken(colors[0], token);
  const containsTokenInColors = colors.some((color) => includesColorToken(color, token));
  const tokenInName = normalizedName.includes(token);

  if (exactSingleColor) {
    return 300;
  }
  if (containsTokenInColors && tokenInName) {
    return 200;
  }
  if (containsTokenInColors) {
    return 100;
  }
  if (tokenInName) {
    return 10;
  }

  return 0;
};

const includesToken = (arr: string[] | undefined, value: string) =>
  Array.isArray(arr) && arr.some((item) => item.toLowerCase() === value);

const applyProductFilters = (products: ProductData[], options: SearchProductsOptions) => {
  const material = normalizeToken(options.material);
  const color = normalizeToken(options.color);

  return products.filter((product) => {
    const materialPass = material === '' || includesToken(product.materials, material);
    const colorPass = color === '' || includesToken(product.colors, color);
    return materialPass && colorPass;
  });
};

const applyProductSort = (products: ProductData[], sort?: string | null) => {
  if (sort === 'price-asc') return [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return [...products].sort((a, b) => b.price - a.price);
  return products;
};

const runAlgoliaSearch = async (
  query: string,
  page: number,
  hitsPerPage: number,
  colorIntent?: ColorSearchIntent | null,
): Promise<SearchResponse<AlgoliaProductHit>> => {
  const client = createAlgoliaSearchClient();
  const indexName = getAlgoliaIndexName();
  const colorBoostTokens = colorIntent?.boostTokens ?? getColorBoostTokens(query);
  const colorOptionalFilters =
    colorBoostTokens.length > 0
      ? [
          colorBoostTokens.flatMap((token) => [
            `colors:${token}<score=24>`,
            `searchImageHints:${token}<score=16>`,
          ]),
        ]
      : undefined;

  return client.searchSingleIndex<AlgoliaProductHit>({
    indexName,
    searchParams: {
      query: colorIntent?.normalizedQuery || query,
      page: Math.max(0, page - 1),
      hitsPerPage,
      // Apply Russian language optimizations
      ...SEARCH_PARAMETERS,
      ...RUSSIAN_SEARCH_CONFIG.queryParameters,
      // Keep results strict to avoid noisy partial matches.
      removeWordsIfNoResults: 'none',
      restrictSearchableAttributes: [...PRODUCT_RELEVANT_SEARCH_ATTRIBUTES],
      filters: colorIntent?.filters,
      optionalFilters: colorOptionalFilters,
      sumOrFiltersScores: colorOptionalFilters ? true : undefined,
      // Handle different word forms
      alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
      // Keep typo matching strict so multi-word queries stay relevant.
      typoTolerance: 'strict',
      // Remove stop words for better Russian search
      removeStopWords: ['ru'],
    },
  });
};

export async function searchProductsByAlgolia(
  searchParam: string,
  page: number,
  hitsPerPage: number = SEARCH_CONFIG.HITS_PER_PAGE,
  options: SearchProductsOptions = {},
): Promise<AlgoliaSearchResult> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const hasDynamicFilters = Boolean(normalizeToken(options.material) || normalizeToken(options.color) || options.sort);
  const colorIntent = getColorSearchIntent(searchParam);

  if (!hasAlgoliaSearchConfig()) {
    console.warn('Algolia search is not configured. Falling back to Sanity search.');
    const products = await searchProductsByName(searchParam);
    const filtered = applyProductSort(
      applyProductFilters((Array.isArray(products) ? products : []) as ProductData[], options),
      options.sort
    );
    const totalFound = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFound / hitsPerPage));
    const pageToUse = Math.min(safePage, totalPages);
    const start = (pageToUse - 1) * hitsPerPage;

    return {
      products: filtered.slice(start, start + hitsPerPage),
      totalFound,
      totalPages,
      currentPage: pageToUse,
    };
  }

  if (!hasDynamicFilters) {
    const response = await runAlgoliaSearch(searchParam, safePage, hitsPerPage, colorIntent);
    const totalFound = typeof response.nbHits === 'number' ? response.nbHits : 0;
    const totalPages = typeof response.nbPages === 'number' ? response.nbPages : 0;

    if (totalPages > 0 && safePage > totalPages) {
      const fallbackResponse = await runAlgoliaSearch(searchParam, totalPages, hitsPerPage, colorIntent);
      return {
        products: applyColorPriority(
          fallbackResponse.hits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam)),
          colorIntent
        ),
        totalFound,
        totalPages,
        currentPage: totalPages,
      };
    }

    return {
      products: applyColorPriority(
        response.hits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam)),
        colorIntent
      ),
      totalFound,
      totalPages,
      currentPage: safePage,
    };
  }

  const firstPage = await runAlgoliaSearch(searchParam, 1, 1000, colorIntent);
  const allHits = [...firstPage.hits];
  const totalAlgoliaPages = typeof firstPage.nbPages === 'number' ? firstPage.nbPages : 0;

  for (let p = 2; p <= totalAlgoliaPages; p += 1) {
    const pageResponse = await runAlgoliaSearch(searchParam, p, 1000, colorIntent);
    allHits.push(...pageResponse.hits);
  }

  const allProducts = allHits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam));
  const filtered = applyProductSort(
    applyColorPriority(applyProductFilters(allProducts, options), colorIntent),
    options.sort
  );
  const totalFound = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFound / hitsPerPage));
  const pageToUse = Math.min(safePage, totalPages);
  const start = (pageToUse - 1) * hitsPerPage;

  return {
    products: filtered.slice(start, start + hitsPerPage),
    totalFound,
    totalPages,
    currentPage: pageToUse,
  };
}
