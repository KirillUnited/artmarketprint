import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
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
