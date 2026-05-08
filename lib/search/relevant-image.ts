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

function uniqueTokens(tokens: string[]): string[] {
  return Array.from(new Set(tokens));
}

function normalizeRussianAdjectiveStem(token: string): string {
  const normalized = normalizeToken(token);
  const endings = [
    'ыми',
    'ими',
    'ого',
    'ему',
    'ому',
    'ыми',
    'ими',
    'ый',
    'ий',
    'ой',
    'ая',
    'яя',
    'ое',
    'ее',
    'ые',
    'ие',
    'ую',
    'юю',
    'ым',
    'им',
    'ом',
    'ем',
    'ых',
    'их',
    'ую',
    'юю',
  ];

  for (const ending of endings) {
    if (normalized.length > ending.length + 1 && normalized.endsWith(ending)) {
      return normalized.slice(0, -ending.length);
    }
  }

  return normalized;
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

function startsWithStem(a: string, b: string): boolean {
  const minLen = Math.min(a.length, b.length);
  const checkLen = Math.max(Math.floor(minLen * 0.7), minLen - 2);
  return a.slice(0, checkLen) === b.slice(0, checkLen);
}

export function pickRelevantImageForQuery(
  hit: ImageAwareHit,
  query: string
): ImageMatchResult {
  if (!query || !hit.variantImagesByColor) {
    return getFallback(hit);
  }

  const normalizedQuery = normalizeToken(query);
  const tokens = uniqueTokens(tokenizeQuery(query));
  const tokenStems = uniqueTokens(tokens.map((token) => normalizeRussianAdjectiveStem(token)));
  if (!tokens.length) {
    return getFallback(hit);
  }

  const variants = Object.entries(hit.variantImagesByColor)
    .map(([rawColor, image]) => ({
      raw: rawColor,
      color: normalizeToken(rawColor),
      tokens: uniqueTokens(tokenizeQuery(rawColor)),
      stems: uniqueTokens(tokenizeQuery(rawColor).map((token) => normalizeRussianAdjectiveStem(token))),
      image,
    }))
    .filter((v) => v.color && v.image);

  if (!variants.length) {
    return getFallback(hit);
  }

  // 1) Full phrase match first ("королевский синий" should beat plain "синий").
  const exactPhrase = variants.find((v) => v.color === normalizedQuery);
  if (exactPhrase) {
    return {
      image: exactPhrase.image,
      color: exactPhrase.raw,
      matchType: 'exact',
    };
  }

  const partialPhrase = variants.find(
    (v) => v.color.includes(normalizedQuery) || normalizedQuery.includes(v.color)
  );
  if (partialPhrase) {
    return {
      image: partialPhrase.image,
      color: partialPhrase.raw,
      matchType: 'partial',
    };
  }

  // 2) Score by token coverage/proximity for robust multi-word color matching.
  const scored = variants
    .map((variant) => {
      let exactTokenMatches = 0;
      let partialTokenMatches = 0;
      let fuzzyTokenMatches = 0;

      for (const token of tokens) {
        const tokenStem = normalizeRussianAdjectiveStem(token);

        if (variant.color === token) {
          exactTokenMatches += 1;
          continue;
        }

        if (variant.color.includes(token) || token.includes(variant.color)) {
          partialTokenMatches += 1;
          continue;
        }

        if (startsWithStem(variant.color, token)) {
          fuzzyTokenMatches += 1;
          continue;
        }

        if (variant.stems.some((stem) => stem === tokenStem)) {
          fuzzyTokenMatches += 1;
        }
      }

      const phraseContainsBonus =
        normalizedQuery.includes(variant.color) || variant.color.includes(normalizedQuery)
          ? 1
          : 0;

      const stemCoverageBonus = variant.stems.some((stem) => tokenStems.includes(stem)) ? 1 : 0;

      const score =
        exactTokenMatches * 5 +
        partialTokenMatches * 3 +
        fuzzyTokenMatches * 2 +
        phraseContainsBonus +
        stemCoverageBonus;

      return {
        variant,
        score,
        exactTokenMatches,
        partialTokenMatches,
        fuzzyTokenMatches,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.exactTokenMatches !== a.exactTokenMatches) {
        return b.exactTokenMatches - a.exactTokenMatches;
      }
      if (b.partialTokenMatches !== a.partialTokenMatches) {
        return b.partialTokenMatches - a.partialTokenMatches;
      }
      return b.fuzzyTokenMatches - a.fuzzyTokenMatches;
    });

  const best = scored[0];
  if (best) {
    const matchType: ImageMatchResult['matchType'] =
      best.exactTokenMatches > 0
        ? 'exact'
        : best.partialTokenMatches > 0
          ? 'partial'
          : 'fuzzy';

    return {
      image: best.variant.image,
      color: best.variant.raw,
      matchType,
    };
  }

  return getFallback(hit);
}
