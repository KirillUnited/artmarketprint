// Search configuration constants
export const SEARCH_CONFIG = {
  INDEX_NAME: 'products',
  HITS_PER_PAGE: 30,
  PLACEHOLDER: 'Название товара...',
  EMPTY_STATE_MESSAGE: 'Товары не найдены'
} as const;

// Default search attributes mapping
export const SEARCH_ATTRIBUTES = {
  primaryText: 'name',
  secondaryText: 'sku',
  tertiaryText: 'colors',
  price: 'price',
  url: 'url',
  image: 'imageUrl'
} as const;

// Search parameters
export const SEARCH_PARAMETERS = {
  hitsPerPage: SEARCH_CONFIG.HITS_PER_PAGE
} as const;