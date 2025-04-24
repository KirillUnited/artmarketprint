/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://artmarketprint.by',
    generateRobotsTxt: false, // автоматически сгенерит robots.txt
    exclude: ['/admin', '/cart', '/search'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://artmarketprint.by/sitemap.xml',
        ],
    },
};
