// Search configuration constants
export const SEARCH_CONFIG = {
  INDEX_NAME: 'services',
  HITS_PER_PAGE: 10,
  PLACEHOLDER: 'Поиск услуг...',
  EMPTY_STATE_MESSAGE: 'Услуги не найдены'
} as const;

// Default search attributes mapping
export const SEARCH_ATTRIBUTES = {
  primaryText: 'title',
  secondaryText: 'description',
  tertiaryText: 'price',
  url: 'slug',
  image: 'imageUrl'
} as const;

// Search parameters
export const SEARCH_PARAMETERS = {
  hitsPerPage: SEARCH_CONFIG.HITS_PER_PAGE
} as const;