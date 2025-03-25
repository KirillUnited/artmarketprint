import React from 'react'
import Section, { SectionButton } from '../../layout/Section';
import { CatalogHeading } from '../Catalog';
import { siteConfig } from '@/config/site';
import { Card, CardFooter } from '@heroui/card';
import clsx from 'clsx';
import Link from 'next/link';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { getUrlFor } from '@/lib/utils';
import { Button } from '@heroui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import { SanityDocument } from 'next-sanity';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { CATEGORIES_QUERY } from '@/sanity/lib/category.query';

export const FeaturedCategoryThumb = ({ item }: any) => {
    return (
        <Card isFooterBlurred as={Link} className="h-full group relative" href={`/categories/${item.currentSlug}`} radius="sm">
            <Image as={NextImage} isZoomed removeWrapper alt={item.title} className="z-0 w-full h-full object-cover aspect-square" radius="sm" src={item.imageUrl ? item.imageUrl : getUrlFor(item.image)} width={220} height={220} />
            <CardFooter className={clsx(
                'absolute bg-black/40 bottom-0 w-full z-10 p-0',
            )}>
                <div className="flex flex-col gap-2 p-3 w-full">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight" title={item.title}>{item.title}</h4>
                        <p
                            className={clsx(
                                'text-xs text-white/80',
                                'grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden'
                            )}
                            title={item.description}>
                            <span className="line-clamp-4">{item.description}</span>
                        </p>
                    </div>
                    <Button as={'span'} className="group/button self-start" color="secondary" radius="sm" role="presentation" size="sm">
                        <span>Подробнее</span>
                        <ArrowUpRightIcon className="group-hover/button:translate-x-1 transition-transform" size={18} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
};

export const FeaturedCategoryList = ({ items }: any) => {
    return (
        <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
            {items?.map((item: any) => (
                <li key={item.title}>
                    <FeaturedCategoryThumb item={item} />
                </li>
            ))}
        </ul>
    )
}
export default async function FeaturedCategories() {
    const categories: SanityDocument[] = await getSanityDocuments(CATEGORIES_QUERY);
    const categoryItemsCount = categories.length;

    if (!Array.isArray(categories) || categories.length === 0) return null;

    return (
        <Section className="relative" id="categories">
            <CatalogHeading categoryItemsCount={categoryItemsCount} />

            <FeaturedCategoryList items={categories} />

            {categoryItemsCount > 4 && <SectionButton href={`/categories`} label="Все категории"
                className='self-start'
            />}
        </Section>
    );
}
