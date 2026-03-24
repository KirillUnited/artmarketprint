# Algolia Search Implementation for Services

This implementation provides a fast, searchable interface for services using Algolia.

## Studio Repository Files

### 1. Initial Indexing Script
`studio/scripts/algolia-sync-services.ts`
- Fetches all published services from Sanity
- Transforms data to Algolia format
- Generates image URLs using Sanity's image CDN
- Batch uploads to Algolia index

### 2. Real-time Sync Function
`studio/functions/algolia-service-sync.ts`
- Handles CREATE/UPDATE/DELETE operations
- Ignores drafts automatically
- Upserts or removes objects from Algolia

## Frontend Repository Files

### 1. Type Definitions
`types/service-search.ts`
- Defines the ServiceSearchHit type for type safety

### 2. Search Components
`components/ServiceSearch.tsx`
- Main search component with modal interface
- Uses InstantSearchNext for React integration
- Sorts by publishedAt (newest first)

`components/SearchHit.tsx`
- Individual search result component
- Displays image, title, description, and price
- Links to service detail page

### 3. Utilities
`lib/algolia-client.ts`
- Algolia client configuration for both admin and search operations

`lib/image-utils.ts`
- Helper function to generate optimized image URLs

## Environment Variables Required

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=your_sanity_dataset
```

## Usage

1. Run the initial sync script:
```bash
node studio/scripts/algolia-sync-services.ts
```

2. Implement real-time sync in your Sanity webhook handler using the `syncServiceToAlgolia` function

3. Use the `ServiceSearch` component in your frontend:
```jsx
import { ServiceSearch } from "@/components/ServiceSearch";

<ServiceSearch />
```

## Features

- Fast search (<100ms response times)
- Image thumbnails in results
- Highlighted matches
- Sorting by newest first
- Responsive design
- Keyboard navigation support
- Empty state handling
- Type-safe implementation