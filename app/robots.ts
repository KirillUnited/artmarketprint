import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
	const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'production';
	const IS_STAGING = APP_ENV === 'staging';

	if (IS_STAGING) {
		return {
			rules: [
				{
					userAgent: '*',
					disallow: '/',
				},
			],
		};
	}

	return {
		rules: [
			{
				userAgent: '*',
				disallow: ['/admin/', '/cart/', '/search/', '*/search?query='],
				allow: '/',
			},
		],
		sitemap: 'https://artmarketprint.by/sitemap.xml',
	};
}
