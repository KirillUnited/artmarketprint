import { urlFor } from "@/sanity/lib/image";

/**
 * Generate a CDN-optimized image URL for Algolia search results
 * @param image - Sanity image object
 * @returns Optimized image URL or undefined
 */
export function generateImageUrlForAlgolia(image: any): string | undefined {
  if (!image) return undefined;

  try {
    // Use the existing urlFor utility to generate a properly formatted URL
    const imageUrl = urlFor(image)
      .width(400)
      .height(400)
      .quality(80)
      .url();

    return imageUrl || undefined;
  } catch (error) {
    console.warn("Failed to generate image URL for Algolia:", error);
    return undefined;
  }
}