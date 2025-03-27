import Image from 'next/image';

import { siteConfig } from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import Section from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import { Suspense } from 'react';
import { cache } from 'react';

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_NAME = 'products-27-03-25.json';
const DATA_FILE_PATH = path.join(process.cwd(), '_data', DATA_FILE_NAME);

// Кешируем данные, чтобы не загружать файл при каждом запросе
let cachedData: any | null = null;

export async function getJsonFileData(): Promise<any> {
  if (cachedData) return cachedData;

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    cachedData = JSON.parse(fileContent);
    return cachedData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw new Error(`Failed to load '${DATA_FILE_NAME}' file data`);
  }
}

export async function getAllProducts() {
  const jsonData = await getJsonFileData();
  return jsonData?.data?.item ?? [];
}

export async function getAllProductCategories() {
  const products = await getAllProducts();

  const categories = new Set<string>();

  for (const product of products) {
    if (!product?.category) continue;
    const [categoryName] = product.category[0].split('|');
    categories.add(categoryName);
  }

  return Array.from(categories);
}

const getCachedProducts = cache(() => getAllProducts());

export default async function ProductsPage() {
    console.log('Page started');
    const products = await getCachedProducts();
    console.log('Products loades');

    const categories = await getAllProductCategories();
    console.log('Categories loaded');

    const breadcrumbs = await getSanityDocuments(NAVIGATION_QUERY);
    console.log(breadcrumbs)

    console.log('Products Page loaded');

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
                    priority
                    alt={siteConfig.catalogSection.title}
                    className="absolute inset-0 object-cover w-full h-full"
                    height={1080}
                    src="/images/catalog-3.jpg"
                    width={1920}
                />
                <div className="container flex flex-col gap-8 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {'Каталог'}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {'Наш каталог товаров'}
                        </p>

                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs[0].links} section='catalog' />
                    </div>
                </div>
            </section>
            <Section id="products" innerClassname='pt-6 md:pt-6'>
                <Suspense fallback={<div className="text-center">Загрузка товаров...</div>}>
                    <ProductsView products={products} categories={categories} />
                </Suspense>
            </Section>
        </>
    );
}