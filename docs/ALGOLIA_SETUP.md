# Algolia Setup Guide

This guide explains how to set up Algolia search for the services in your Sanity/Next.js application.

## Prerequisites

1. An Algolia account (free tier available)
2. A Sanity project with services
3. Access to your project's environment variables

## Step 1: Create Algolia Application

1. Sign up at [Algolia](https://www.algolia.com/)
2. Create a new application
3. Note down your Application ID

## Step 2: Create Search Index

1. In your Algolia dashboard, create a new index named `services`
2. Note down your Search-Only API Key (for frontend use)
3. Note down your Admin API Key (for backend operations)

## Step 3: Configure Environment Variables

Add the following environment variables to your `.env.local` file (the sync script loads both `.env` and `.env.local` from the project root):

```env
# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_only_api_key
ALGOLIA_ADMIN_KEY=your_admin_api_key

# Sanity Configuration (if not already present)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
SANITY_API_TOKEN=your_sanity_api_token
```

## Step 4: Run Initial Sync

Execute the initial sync script to populate Algolia with your existing services:

```bash
npm run sync-services-algolia
```

## Step 5: Set Up Real-time Sync (Optional)

For real-time synchronization, set up a webhook in your Sanity project that triggers the `syncServiceToAlgolia` function when services are created, updated, or deleted.

## Step 6: Use the Search Component

Import and use the ServiceSearch component in your application:

```jsx
import { ServiceSearch } from "@/components/ServiceSearch";

<ServiceSearch />
```

## Troubleshooting

1. **Search returns no results**: Make sure you've run the initial sync
2. **Images not appearing**: Check that your Sanity image URLs are correctly configured
3. **Permission errors**: Verify your Algolia API keys have the correct permissions

## Security Notes

- Never expose your Admin API Key in client-side code
- Use the Search-Only API Key for frontend operations
- Keep your environment variables secure