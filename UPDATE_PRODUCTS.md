# Product Update Script

This script updates products in Sanity CMS by first deleting all existing products and then importing new ones.

## Usage

To run the product update script:

```bash
npm run update-products
```

## What it does

1. Deletes all existing products from Sanity CMS
2. Fetches new product data from all configured sources
3. Imports the new product data to Sanity CMS

## How it works

The script uses the existing functions from the codebase:
- `deleteAllOfType('product')` from `@/sanity/delete` to remove all products
- `updateProducts()` from `@/lib/products/update` to fetch and import new products

## Error Handling

If any step fails, the script will exit with an error code and log the error to the console.