/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'ru.artegifts.by',
			},
			{
				protocol: 'https',
				hostname: 'markli.by',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
		},
	},
};

module.exports = nextConfig;
