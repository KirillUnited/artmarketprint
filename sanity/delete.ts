import { client } from './client';

const DOC_TYPE = 'product'; // Replace with the type you want to delete

async function deleteAllOfType() {
  try {
    // Fetch all document IDs of the specified type
    const docs = await client.fetch<{_id: string}[]>(
      `*[_type == $type]{_id}`,
      { type: DOC_TYPE }
    );

    if (docs.length === 0) {
      console.log(`No documents of type "${DOC_TYPE}" found.`);
      return;
    }

    // Delete in batches to avoid API limits
    const batchSize = 100;
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);
      const ids = batch.map(doc => doc._id);
      await client.delete({ query: `*[_id in $ids]._id`, params: { ids } });
      console.log(`Deleted batch ${i / batchSize + 1}: ${ids.length} documents.`);
    }

    console.log(`All documents of type "${DOC_TYPE}" have been deleted.`);
  } catch (err) {
    console.error('Error deleting documents:', err);
  }
}

deleteAllOfType();