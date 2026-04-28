import { urlFor } from "@/sanity/lib/image";

const BYPASS_NEXT_IMAGE_OPTIMIZER_HOSTS = new Set(["markli.by", "www.markli.by"]);

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

/**
 * Some upstream image hosts frequently timeout when proxied through `/_next/image`.
 * For these hosts, render the original URL directly via `unoptimized`.
 */
export function shouldBypassNextImageOptimization(src?: string | null): boolean {
  if (!src || src.startsWith("/")) return false;

  try {
    const url = new URL(src);
    const hostname = url.hostname.toLowerCase();

    return BYPASS_NEXT_IMAGE_OPTIMIZER_HOSTS.has(hostname);
  } catch {
    return false;
  }
}
