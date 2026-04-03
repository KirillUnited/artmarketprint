# Russian Language Search with Algolia

This document explains how to implement and optimize Russian language search functionality in Algolia for the ArtMarketPrint application.

## Overview

To accept all variants for Algolia search like красный, красные, красная, we've implemented several approaches:

1. **Synonyms Configuration** - Define relationships between Russian word forms
2. **Language-specific Settings** - Optimize Algolia for Russian language processing
3. **Search Parameter Optimizations** - Enhance query processing for Russian

## Implementation Details

### 1. Synonyms Configuration

We've added synonyms for common Russian adjective forms in the indexing script (`studio/scripts/algolia-sync-services.ts`):

```javascript
synonyms: [
  // Color variations
  { objectID: 'synonym-1', type: 'synonym', synonyms: ['красный', 'красная', 'красное', 'красные'] },
  { objectID: 'synonym-2', type: 'synonym', synonyms: ['синий', 'синяя', 'синее', 'синие'] },
  { objectID: 'synonym-3', type: 'synonym', synonyms: ['зеленый', 'зеленая', 'зеленое', 'зеленые'] },
  // Additional synonyms can be added as needed
]
```

### 2. Language-specific Settings

The Algolia index is configured with Russian language optimizations:

```javascript
settings: {
  language: 'ru', // Enable Russian language processing
  removeStopWords: ['ru'], // Remove Russian stop words
  ignorePlurals: true, // Handle plural forms automatically
}
```

### 3. Search Parameter Optimizations

Frontend search components are configured with Russian-specific parameters:

```javascript
// Russian language optimizations
advancedSyntax: true,
typoTolerance: true,
ignorePlurals: true,
removeStopWords: ['ru'],
alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym']
```

## Testing Russian Search

A test script is available at `scripts/test-russian-search.ts` to verify the implementation:

```bash
npm run test-russian-search
```

This script tests various Russian word forms and verifies that synonyms work correctly.

## Adding New Russian Words

To add new Russian word forms or synonyms:

1. Update the `synonyms` array in `studio/scripts/algolia-sync-services.ts`
2. Run the product sync script to apply changes:
   ```bash
   npm run sync-products-algolia
   ```

## Common Russian Word Patterns

Here are some common Russian adjective endings that should be grouped as synonyms:

- Masculine: -ый, -ой (красный, синий)
- Feminine: -ая (красная, синяя)
- Neuter: -ое (красное, синее)
- Plural: -ые, -ие (красные, синие)

## Troubleshooting

If Russian search is not working as expected:

1. Verify that the synonyms are correctly configured in the indexing script
2. Check that the Algolia index settings include `language: 'ru'`
3. Ensure that the frontend search parameters include Russian optimizations
4. Run the test script to verify functionality

## Performance Considerations

The Russian language optimizations may slightly increase indexing time due to:
- Additional synonym processing
- Language-specific text analysis
- Enhanced query parsing

However, these improvements significantly enhance search accuracy for Russian users.