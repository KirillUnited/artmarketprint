type BreadcrumbItem = { name: string; url: string };

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://artmarketprint.by';

export function toAbsoluteUrl(pathOrUrl: string, siteUrl: string = DEFAULT_SITE_URL): string {
	if (!pathOrUrl) return siteUrl;

	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

	const base = siteUrl.replace(/\/+$/, '');
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;

	return `${base}${path}`;
}

export function tryParseJsonLd(value: unknown): Record<string, unknown> | Array<Record<string, unknown>> | null {
	if (!value) return null;

	if (typeof value === 'object') return value as any;

	if (typeof value !== 'string') return null;

	const trimmed = value.trim();
	if (!trimmed) return null;

	try {
		return JSON.parse(trimmed);
	} catch {
		return null;
	}
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': item.url,
				name: item.name,
			},
		})),
	};
}

export function buildWebSiteJsonLd(input: { url: string; name: string }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${input.url.replace(/\/+$/, '')}/#website`,
		url: input.url,
		name: input.name,
	};
}

export function buildProductJsonLd(input: {
	name: string;
	description?: string;
	url: string;
	imageUrls?: string[];
	brand?: string;
	sku?: string;
	price?: number | string;
	priceCurrency?: string;
	availability?: string;
}) {
	const imageUrls = (input.imageUrls || []).filter(Boolean);
	const hasPrice = input.price !== undefined && input.price !== null && `${input.price}` !== '';

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: input.name,
		description: input.description || undefined,
		image: imageUrls.length > 0 ? imageUrls : undefined,
		url: input.url,
		sku: input.sku || undefined,
		brand: input.brand
			? {
					'@type': 'Brand',
					name: input.brand,
				}
			: undefined,
		offers: hasPrice
			? {
					'@type': 'Offer',
					url: input.url,
					price: `${input.price}`,
					priceCurrency: input.priceCurrency || 'BYN',
					availability: input.availability || undefined,
				}
			: undefined,
	};
}

export function buildServiceJsonLd(input: {
	name: string;
	description?: string;
	url: string;
	imageUrl?: string;
	price?: number | string;
	priceCurrency?: string;
}) {
	const hasPrice = input.price !== undefined && input.price !== null && `${input.price}` !== '';

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: input.name,
		description: input.description || undefined,
		url: input.url,
		image: input.imageUrl || undefined,
		offers: hasPrice
			? {
					'@type': 'Offer',
					url: input.url,
					price: `${input.price}`,
					priceCurrency: input.priceCurrency || 'BYN',
				}
			: undefined,
	};
}

export function buildArticleJsonLd(input: {
	headline: string;
	description?: string;
	url: string;
	imageUrl?: string;
	datePublished?: string;
	dateModified?: string;
	authorName?: string;
	publisherName: string;
	publisherLogoUrl?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': input.url,
		},
		headline: input.headline,
		description: input.description || undefined,
		image: input.imageUrl || undefined,
		datePublished: input.datePublished || undefined,
		dateModified: input.dateModified || undefined,
		author: input.authorName
			? {
					'@type': 'Person',
					name: input.authorName,
				}
			: undefined,
		publisher: {
			'@type': 'Organization',
			name: input.publisherName,
			logo: input.publisherLogoUrl
				? {
						'@type': 'ImageObject',
						url: input.publisherLogoUrl,
					}
				: undefined,
		},
	};
}