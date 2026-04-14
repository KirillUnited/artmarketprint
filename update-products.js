#!/usr/bin/env node
/**
 * Script to update products in Sanity CMS
 *
 * This script performs three operations:
 * 1. Deletes all existing products from Sanity
 * 2. Fetches new product data and imports it to Sanity
 * 3. Creates a backup of the Sanity dataset (excluding products)
 */

// Load environment variables from .env.local when running via Node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadEnvLocal() {
  try {
    const envPath = path.join(__dirname, '.env.local');

    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, 'utf8').split('\n');

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line || line.startsWith('#')) continue;

      const eqIndex = line.indexOf('=');

      if (eqIndex === -1) continue;

      const key = line.slice(0, eqIndex).trim();
      const value = line.slice(eqIndex + 1).trim();

      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (err) {
    console.error('Failed to load .env.local:', err);
  }
}

loadEnvLocal();

// Use dynamic imports for ES modules
async function runUpdate() {
  try {
    console.log('🔄 Starting product update process...');

    // Dynamically import the required modules
    const { deleteAllOfType } = await import('./sanity/delete.mjs');
    const { updateProducts } = await import('./lib/products/update.mjs');

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

    console.log('🔎 Syncing products to Algolia...');
    execSync('npm run sync-products-algolia', { stdio: 'inherit' });
    console.log('✅ Product sync to Algolia completed successfully!');

    // Step 3: Create backup of Sanity dataset
    console.log('💾 Creating backup of Sanity dataset...');
    execSync('npm run backup-sanity', { stdio: 'inherit' });
    console.log('✅ Backup completed successfully!');

    console.log('🎉 Product update process completed successfully!');
  } catch (error) {
    console.error('❌ Error during product update process:', error);
    process.exit(1);
  }
}

// Run the update process
runUpdate();