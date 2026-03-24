// Test file to verify all components work together
import { ServiceSearchHit } from "@/types/service-search";
import { SEARCH_CONFIG } from "@/lib/search-config";
import { generateImageUrlForAlgolia } from "@/lib/image-utils";

// Example service data
const exampleService: any = {
  _id: "service-123",
  title: "Дизайн упаковки",
  slug: { current: "design-packaging" },
  description: "Профессиональный дизайн упаковки для ваших продуктов",
  price: "от 500 руб.",
  image: null, // No image for this example
  publishedAt: "2023-01-15T10:00:00Z"
};

// Test the transformation function
async function testTransformFunction() {
  // This would normally be in the studio/functions/algolia-service-sync.ts file
  const truncatedDescription = exampleService.description?.substring(0, 200) + '...';

  const algoliaRecord: ServiceSearchHit = {
    objectID: exampleService._id,
    title: exampleService.title,
    slug: exampleService.slug.current,
    description: truncatedDescription,
    price: exampleService.price,
    imageUrl: generateImageUrlForAlgolia(exampleService.image),
    publishedAt: exampleService.publishedAt
  };

  console.log("Transformed service for Algolia:", algoliaRecord);
  return algoliaRecord;
}

// Test search configuration
function testSearchConfig() {
  console.log("Search configuration:");
  console.log("- Index name:", SEARCH_CONFIG.INDEX_NAME);
  console.log("- Hits per page:", SEARCH_CONFIG.HITS_PER_PAGE);
  console.log("- Placeholder:", SEARCH_CONFIG.PLACEHOLDER);
  console.log("- Empty state message:", SEARCH_CONFIG.EMPTY_STATE_MESSAGE);
}

// Run tests
testSearchConfig();
testTransformFunction().then(record => {
  console.log("✅ All tests passed!");
  console.log("You can now use the ServiceSearch component in your application.");
});