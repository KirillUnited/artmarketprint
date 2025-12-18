import { client } from '@/sanity/client';
import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const [services, categories, projects] = await Promise.all([
    client.fetch(`*[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
  ]);

  const servicePages: MetadataRoute.Sitemap = services.map((item: any) => ({
    url: `${BASE_URL}/services/${item.slug}`,
    lastModified: item._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((item: any) => ({
    url: `${BASE_URL}/categories/${item.slug}`,
    lastModified: item._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((item: any) => ({
    url: `${BASE_URL}/projects/${item.slug}`,
    lastModified: item._updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...categoryPages,
    ...projectPages,
  ];
}
