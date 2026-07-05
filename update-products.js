#!/usr/bin/env node
/**
 * Script to update products in Sanity CMS
 *
 * This script performs three operations:
 * 1. Deletes all existing products from Sanity
 * 2. Fetches new product data and imports it to Sanity
 * 3. Syncs products to Algolia search engine
 */

// Load environment variables from .env.local when running via Node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { sendTelegramMessage } = require('./scripts/telegram');

function loadEnvLocal() {
  try {
    const envPath = path.join(__dirname, '.env');

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
    console.error('Failed to load .env:', err);
  }
}

loadEnvLocal();

// Use dynamic imports for ES modules
async function runUpdate() {
  try {
    console.log('🔄 Starting product update process...');

    const { deleteAllOfType } = await import('./sanity/delete.mjs');
    const { importDataToSanity } = await import('./sanity/import.mjs');
    const { fetchAllProductsData } = await import('./lib/products/data.mjs');

    console.log('📥 Fetching and preparing new products...');
    const products = await fetchAllProductsData();

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('No products fetched. Aborting without deleting existing products in Sanity.');
    }

    console.log(`✅ Prepared ${products.length} products. Proceeding with Sanity update...`);

    console.log('🗑️ Deleting all existing products from Sanity...');
    await deleteAllOfType('product');
    console.log('✅ All products deleted successfully!');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('📦 Importing new products to Sanity...');
    await importDataToSanity(products);
    console.log('✅ New products imported successfully!');

    // Step 3: Sync products to Algolia

    console.log('🔎 Syncing products to Algolia...');
    execSync('npm run sync-products-algolia', { stdio: 'inherit' });
    console.log('✅ Product sync to Algolia completed successfully!');

    console.log('🎉 Product update process completed successfully!');

    // Step 4: Notify via Telegram

    console.log('Notify via Telegram...');

    await sendTelegramMessage('🎉 Каталог товаров обновлён');
  } catch (error) {
    console.error('❌ Error during product update process:', error);
    await sendTelegramMessage('❌ Ошибка во время обновления каталога в Sanity: ' + error.message);
    process.exit(1);
  }
}

// Run the update process
runUpdate();