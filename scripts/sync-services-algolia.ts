/**
 * Script to sync all services from Sanity to Algolia
 *
 * Usage:
 * npm run sync-services-algolia
 *
 * (Run via `ts-node` — plain `node` does not execute `.ts` files.)
 */

import { syncServicesToAlgolia } from '../studio/scripts/algolia-sync-services';

async function runSync() {
  try {
    console.log('Starting Algolia service sync...');
    await syncServicesToAlgolia();
    console.log('Algolia service sync completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Algolia service sync failed:', error);
    process.exit(1);
  }
}

// Run when executed via ts-node (CommonJS); not when imported
// eslint-disable-next-line @typescript-eslint/no-require-imports -- CLI entry, ts-node emits CJS
if (require.main === module) {
  void runSync();
}