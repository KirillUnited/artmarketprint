#!/usr/bin/env ts-node
/**
 * Script to update products in Sanity CMS
 *
 * This script performs two operations:
 * 1. Deletes all existing products from Sanity
 * 2. Fetches new product data and imports it to Sanity
 */

import { deleteAllOfType } from './sanity/delete';
import { updateProducts } from './lib/products/update';

async function runUpdate() {
  try {
    console.log('🔄 Starting product update process...');

    // Step 1: Delete all existing products from Sanity
    console.log('🗑️ Deleting all existing products from Sanity...');
    await deleteAllOfType('product');
    console.log('✅ All products deleted successfully!');

    // Optional: Add a small delay to ensure deletion is complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Step 2: Update with new products
    console.log('📥 Fetching and importing new products...');
    await updateProducts();
    console.log('✅ New products imported successfully!');

    console.log('🎉 Product update process completed successfully!');
  } catch (error) {
    console.error('❌ Error during product update process:', error);
    process.exit(1);
  }
}

// Run the update process
runUpdate();