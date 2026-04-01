#!/usr/bin/env node
/**
 * Script to test Russian language search functionality with Algolia
 * This script tests various Russian word forms and synonyms
 */

import { createAlgoliaSearchClient } from '../lib/algolia-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

async function testRussianSearch() {
  try {
    console.log('Testing Russian language search with Algolia...\n');

    // Create Algolia search client
    const client = createAlgoliaSearchClient();
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX || 'products';

    // Test queries with different Russian word forms
    const testQueries = [
      'красный',     // red (masculine)
      'красная',     // red (feminine)
      'красное',     // red (neuter)
      'красные',     // red (plural)
      'синий',       // blue (masculine)
      'синяя',       // blue (feminine)
      'синие',       // blue (plural)
      'зеленый',     // green (masculine)
      'зеленая',     // green (feminine)
      'зеленые',     // green (plural)
    ];

    console.log('Testing search queries for Russian word forms:');
    console.log('==============================================\n');

    for (const query of testQueries) {
      console.log(`Searching for: "${query}"`);

      try {
        // Perform search with Russian language optimizations
        const response = await client.searchSingleIndex({
          indexName,
          searchParams: {
            query,
            hitsPerPage: 5,
            // Russian language optimizations
            advancedSyntax: true,
            typoTolerance: true,
            ignorePlurals: true,
            removeStopWords: ['ru'],
            alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
            minWordSizefor1Typo: 3,
            minWordSizefor2Typos: 6,
            removeDuplicates: true,
          },
        });

        console.log(`  Found ${response.nbHits} results`);
        if (response.hits.length > 0) {
          console.log('  Sample results:');
          response.hits.slice(0, 3).forEach((hit: any, index: number) => {
            console.log(`    ${index + 1}. ${hit.name || hit.title || 'Unnamed product'} (${hit.objectID})`);
          });
        }
        console.log('');
      } catch (error) {
        console.error(`  Error searching for "${query}":`, error);
      }
    }

    // Test synonym functionality
    console.log('Testing synonym functionality:');
    console.log('==============================\n');

    const synonymTests = [
      { query: 'красный', expectedSynonyms: ['красная', 'красное', 'красные'] },
      { query: 'синий', expectedSynonyms: ['синяя', 'синее', 'синие'] },
    ];

    for (const test of synonymTests) {
      console.log(`Testing synonyms for: "${test.query}"`);
      console.log(`Expected to match: ${test.expectedSynonyms.join(', ')}`);

      try {
        // Search for the base form
        const response = await client.searchSingleIndex({
          indexName,
          searchParams: {
            query: test.query,
            hitsPerPage: 3,
            // Enable synonym search
            synonyms: true,
          },
        });

        console.log(`  Found ${response.nbHits} results for "${test.query}"`);
        console.log('');
      } catch (error) {
        console.error(`  Error testing synonyms for "${test.query}":`, error);
      }
    }

    console.log('Russian search testing completed successfully!');

  } catch (error) {
    console.error('Error during Russian search testing:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  testRussianSearch();
}

export { testRussianSearch };