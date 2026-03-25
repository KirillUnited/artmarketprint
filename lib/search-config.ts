// Search configuration constants
export const SEARCH_CONFIG = {
  INDEX_NAME: 'products',
  HITS_PER_PAGE: 10,
  PLACEHOLDER: 'Поиск товаров...',
  EMPTY_STATE_MESSAGE: 'Товары не найдены'
} as const;

// Default search attributes mapping
export const SEARCH_ATTRIBUTES = {
  primaryText: 'name',
  secondaryText: 'description',
  tertiaryText: 'price',
  url: 'url',
  image: 'imageUrl'
} as const;

// Search parameters
export const SEARCH_PARAMETERS = {
  hitsPerPage: SEARCH_CONFIG.HITS_PER_PAGE
} as const;