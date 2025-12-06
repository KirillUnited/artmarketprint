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
		qualities: [50, 75, 85, 100],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '5mb',
			allowedOrigins: ['https://artmarketprint.by', 'localhost:3000', '178.159.44.23:2200', '127.0.0.1:3000'],
		},
	},
};

module.exports = nextConfig;
