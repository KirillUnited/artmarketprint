export type ImageAwareHit = {
  imageUrl?: string;
  galleryImages?: string[];
  variantImagesByColor?: Record<string, string>;
};

function normalizeToken(value: string): string {
  return value.trim().toLowerCase().replaceAll('ё', 'е');
}

function tokenizeQuery(query: string): string[] {
  return query
    .split(/[\s,.;:!?/\\|()[\]{}"'+_-]+/)
    .map((token) => normalizeToken(token))
    .filter((token) => token.length > 1);
}

export function pickRelevantImageForQuery(hit: ImageAwareHit, query: string): string | undefined {
  const fallback =
    hit.imageUrl ||
    (Array.isArray(hit.galleryImages) && hit.galleryImages.length > 0
      ? hit.galleryImages[0]
      : undefined);

  if (!query || typeof query !== 'string' || !hit.variantImagesByColor) {
    return fallback;
  }

  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return fallback;
  }

  const variants = Object.entries(hit.variantImagesByColor)
    .map(([rawColor, image]) => ({ color: normalizeToken(rawColor), image }))
    .filter((entry) => entry.color !== '' && typeof entry.image === 'string' && entry.image.trim() !== '');

  if (variants.length === 0) {
    return fallback;
  }

  for (const token of tokens) {
    const exact = variants.find((entry) => entry.color === token);
    if (exact) {
      return exact.image;
    }
  }

  for (const token of tokens) {
    const partial = variants.find(
      (entry) => entry.color.includes(token) || token.includes(entry.color)
    );
    if (partial) {
      return partial.image;
    }
  }

  // Additional fuzzy matching for cases like "серая" <-> "серый"
  for (const token of tokens) {
    const fuzzy = variants.find((entry) => {
      // Check if token and color share a common root
      const minLength = Math.min(entry.color.length, token.length);
      const checkLength = Math.max(Math.floor(minLength * 0.7), minLength - 2);

      // Compare beginnings of words
      if (entry.color.substring(0, checkLength) === token.substring(0, checkLength)) {
        return true;
      }

      // For short words, check if one contains the other
      if (minLength <= 5) {
        return entry.color.includes(token) || token.includes(entry.color);
      }

      return false;
    });

    if (fuzzy) {
      return fuzzy.image;
    }
  }

  return fallback;
}
