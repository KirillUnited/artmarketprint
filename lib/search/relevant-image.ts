export type ImageAwareHit = {
  imageUrl?: string;
  galleryImages?: string[];
  variantImagesByColor?: Record<string, string>;
};

export type ImageMatchResult = {
  image?: string;
  color?: string;
  matchType?: 'exact' | 'partial' | 'fuzzy' | 'fallback';
};

function normalizeToken(value: string): string {
  return value.trim().toLowerCase().replaceAll('ё', 'е');
}

function tokenizeQuery(query: string): string[] {
  return query
    .split(/[\s,.;:!?/\\|()[\]{}"'+_-]+/)
    .map(normalizeToken)
    .filter((token) => token.length > 1);
}

function getFallback(hit: ImageAwareHit): ImageMatchResult {
  const image =
    hit.imageUrl ||
    (hit.galleryImages?.length ? hit.galleryImages[0] : undefined);

  return {
    image,
    matchType: 'fallback',
  };
}

export function pickRelevantImageForQuery(
  hit: ImageAwareHit,
  query: string
): ImageMatchResult {
  if (!query || !hit.variantImagesByColor) {
    return getFallback(hit);
  }

  const tokens = tokenizeQuery(query);
  if (!tokens.length) {
    return getFallback(hit);
  }

  const variants = Object.entries(hit.variantImagesByColor)
    .map(([rawColor, image]) => ({
      raw: rawColor,
      color: normalizeToken(rawColor),
      image,
    }))
    .filter((v) => v.color && v.image);

  if (!variants.length) {
    return getFallback(hit);
  }

  // unified matcher
  const findMatch = (
    predicate: (token: string, color: string) => boolean
  ): { token: string; variant: typeof variants[number] } | undefined => {
    for (const token of tokens) {
      const variant = variants.find((v) => predicate(token, v.color));
      if (variant) return { token, variant };
    }
  };

  // 1. exact
  const exact = findMatch((t, c) => c === t);
  if (exact) {
    return {
      image: exact.variant.image,
      color: exact.variant.raw,
      matchType: 'exact',
    };
  }

  // 2. partial
  const partial = findMatch((t, c) => c.includes(t) || t.includes(c));
  if (partial) {
    return {
      image: partial.variant.image,
      color: partial.variant.raw,
      matchType: 'partial',
    };
  }

  // 3. fuzzy (RU-friendly light stem)
  const fuzzy = findMatch((t, c) => {
    const minLen = Math.min(t.length, c.length);
    const checkLen = Math.max(Math.floor(minLen * 0.7), minLen - 2);

    if (c.slice(0, checkLen) === t.slice(0, checkLen)) return true;

    if (minLen <= 5) {
      return c.includes(t) || t.includes(c);
    }

    return false;
  });

  if (fuzzy) {
    return {
      image: fuzzy.variant.image,
      color: fuzzy.variant.raw,
      matchType: 'fuzzy',
    };
  }

  return getFallback(hit);
}