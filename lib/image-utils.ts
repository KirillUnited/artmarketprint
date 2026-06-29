import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

const BYPASS_NEXT_IMAGE_OPTIMIZER_HOSTS = new Set(["markli.by", "www.markli.by"]);

export const DEFAULT_PRODUCT_IMAGE = "/images/product-no-image.jpg";

type SanityImageWithAsset = {
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width?: number; height?: number };
    };
  };
};

/**
 * Generate a CDN-optimized image URL for Algolia search results
 * @param image - Sanity image object
 * @returns Optimized image URL or undefined
 */
export function generateImageUrlForAlgolia(image: any): string | undefined {
  if (!image) return undefined;

  try {
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

/**
 * Normalize Sanity image objects, plain URL strings, or fallbacks into a src string.
 */
export function resolveImageSrc(
  image: unknown,
  fallback = DEFAULT_PRODUCT_IMAGE,
): string {
  if (!image) return fallback;

  if (typeof image === "string") {
    const trimmed = image.trim();
    return trimmed || fallback;
  }

  if (typeof image === "object" && image !== null) {
    const sanityImage = image as SanityImageWithAsset;

    if (sanityImage.asset?.url) {
      return sanityImage.asset.url;
    }

    try {
      return urlFor(image as SanityImageSource).url();
    } catch {
      return fallback;
    }
  }

  return fallback;
}

/**
 * Extract LQIP blur hash from a Sanity image object.
 */
export function getImageLqip(image: unknown): string | undefined {
  if (!image || typeof image !== "object") return undefined;

  return (image as SanityImageWithAsset).asset?.metadata?.lqip;
}

/**
 * Build next/image placeholder props from an optional LQIP value.
 */
export function getBlurPlaceholderProps(lqip?: string | null): {
  placeholder: "blur" | "empty";
  blurDataURL?: string;
} {
  if (lqip) {
    return { placeholder: "blur", blurDataURL: lqip };
  }

  return { placeholder: "empty" };
}
