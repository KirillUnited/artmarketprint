import { syncProductsToAlgolia } from '../studio/scripts/algolia-sync-services';

async function runSync() {
  try {
    console.log('Starting Algolia product sync...');
    await syncProductsToAlgolia();
    console.log('Algolia product sync completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Algolia product sync failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  void runSync();
}
