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

// Search parameters with Russian language optimizations
export const SEARCH_PARAMETERS = {
  // Enable advanced query processing for Russian
  advancedSyntax: true,
  // Allow typos and variations in Russian words
  typoTolerance: true,
  // Configure minimum word length for Russian
  minWordSizefor1Typo: 3,
  minWordSizefor2Typos: 6,
  // Enable analytics for search improvements
  analytics: true,
  // Enable personalization if available
  enablePersonalization: false,
} as const;

// Russian language specific configurations
export const RUSSIAN_SEARCH_CONFIG = {
  // Query parameters optimized for Russian
  queryParameters: {
    // Allow searching with different word forms
    alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
    // Ignore plural forms for better matching
    ignorePlurals: true,
    // Handle Russian-specific character variations
    removeStopWords: ['ru'],
  },

  // Facet configurations for Russian attributes
  facets: {
    colors: {
      searchable: true,
      type: 'string'
    },
    materials: {
      searchable: true,
      type: 'string'
    },
    category: {
      searchable: true,
      type: 'string'
    }
  }
} as const;
