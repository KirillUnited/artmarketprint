const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://artmarketprint.by';

/**
 * Контактная информация сайта, зеркалирующая поле `siteContactInfo`
 * из Sanity-документа `siteSettings` (см. SITE_SETTINGS_QUERY).
 */
export interface LocalBusinessContactInfo {
	address?: Array<{ _key?: string; location?: string; link?: string }>;
	emails?: Array<{ _key?: string; email?: string; link?: string }>;
	phones?: Array<{ _key?: string; number?: string; link?: string }>;
	workingHours?: string;
	socialLinks?: Array<{ platform?: string; url?: string; title?: string }>;
}

export interface LocalBusinessJsonLdInput {
	/** Название бизнеса. По умолчанию «Артмаркетпринт». */
	name?: string;
	/** Базовый URL сайта. По умолчанию берётся из NEXT_PUBLIC_SERVER_URL. */
	url?: string;
	/** Контактная информация из Sanity (siteSettings.siteContactInfo). */
	contactInfo?: LocalBusinessContactInfo | null;
	/** Валюта/ценовой диапазон. По умолчанию «BYN». */
	priceRange?: string;
	/** Геокоординаты. В Sanity отсутствуют, поэтому по умолчанию используются значения из Минска. */
	geo?: { latitude: number; longitude: number };
	/**
	 * Структурированная спецификация часов работы.
	 * В Sanity хранится только строкой (`workingHours`), поэтому здесь можно
	 * передать готовую спецификацию; иначе будет использован дефолт Пн–Пт 09:00–18:00.
	 */
	openingHoursSpecification?: Record<string, unknown> | null;
}

const DEFAULT_OPENING_HOURS_SPECIFICATION = {
	'@type': 'OpeningHoursSpecification',
	dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	opens: '09:00',
	closes: '18:00',
};

/**
 * Собирает JSON-LD `LocalBusiness` из данных Sanity.
 * Адрес, телефоны, e-mail и ссылки на соцсети берутся динамически из `contactInfo`,
 * а `geo` и `openingHoursSpecification` остаются опциональными (с дефолтами).
 */
export function buildLocalBusinessJsonLd(input: LocalBusinessJsonLdInput = {}) {
	const {
		name = 'Артмаркетпринт',
		url = DEFAULT_SITE_URL,
		contactInfo,
		priceRange = 'BYN',
		geo = { latitude: 53.9117486, longitude: 27.5170552 },
		openingHoursSpecification = DEFAULT_OPENING_HOURS_SPECIFICATION,
	} = input;

	const baseUrl = url.replace(/\/+$/, '');

	const firstPhone = contactInfo?.phones?.[0];
	const firstEmail = contactInfo?.emails?.[0];
	const firstAddress = contactInfo?.address?.[0];

	// `link` хранится в нормализованном виде (+375297520204), что предпочтительнее
	// для schema.org, чем форматированный `number` («+375 (29) 752-02-04»).
	const telephone = firstPhone?.link || firstPhone?.number;
	const email = firstEmail?.email || firstEmail?.link;
	const streetAddress = firstAddress?.location;

	const sameAs = (contactInfo?.socialLinks ?? [])
		.map((item) => item?.url)
		.filter((value): value is string => Boolean(value));

	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name,
		'@id': `${baseUrl}/#localbusiness`,
		url: `${baseUrl}/`,
		telephone,
		email,
		priceRange,
		address: streetAddress
			? {
					'@type': 'PostalAddress',
					streetAddress,
				}
			: undefined,
		geo: {
			'@type': 'GeoCoordinates',
			latitude: geo.latitude,
			longitude: geo.longitude,
		},
		openingHours: contactInfo?.workingHours || undefined,
		openingHoursSpecification: openingHoursSpecification ?? undefined,
		sameAs: sameAs.length > 0 ? sameAs : undefined,
	};
}

