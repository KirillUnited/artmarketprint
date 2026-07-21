'use client';
import React, { JSX, useEffect, useState } from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

import { fetchNavigation } from '@/lib/fetchNavigation';

export const BreadcrumbWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Breadcrumbs variant="light">
      <BreadcrumbItem className="text-primary font-semibold" href="/" title={'Главная'}>
        <HomeIcon aria-label="Home" size={18} />
      </BreadcrumbItem>
      {children}
    </Breadcrumbs>
  );
};

export default function BaseBreadcrumb({
  items,
  section,
  withJsonLd,
}: {
  items: any;
  section?: string;
  withJsonLd?: boolean;
}): JSX.Element {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const [navigation, setNavigation] = useState<any>({});

  useEffect(() => {
    const navMap = fetchNavigation(items);

    setNavigation(navMap);
  }, []);

  return (
    <>
      <Breadcrumbs variant="light">
        <BreadcrumbItem className="text-primary font-semibold" href="/">
          <HomeIcon aria-label="Home" size={18} />
        </BreadcrumbItem>
        {pathSegments.length > 0 &&
          pathSegments.map((segment: any, index: number) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;
            const title =
              navigation[`${pathSegments[index]}`] || decodeURIComponent(pathSegments[index]);

            return (
              <BreadcrumbItem
                key={href}
                className={clsx('font-semibold', 'max-w-60')}
                classNames={{
                  item: `inline truncate ${isLast ? 'text-primary opacity-100' : ''}`,
                }}
                href={`${href}`}
                title={title}
              >
                {title}
              </BreadcrumbItem>
            );
          })}
      </Breadcrumbs>
    </>
  );
}

export interface ProductBreadcrumbProps {
  category?: string | string[] | null;
  title: string;
  slug: string;
  items?: any;
}

export const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ category, title, slug }) => {
  const categoryTitle = Array.isArray(category) ? category[0] : category;
  const categoryHref = categoryTitle
    ? `/products/categories/${encodeURIComponent(categoryTitle)}`
    : '/products/categories/all';

  return (
    <BreadcrumbWrapper>
      <BreadcrumbItem
        className={clsx('font-semibold', 'max-w-60')}
        classNames={{
          separator: 'text-primary',
          item: 'inline truncate',
        }}
        href={'/products/categories/all'}
        title={'Каталог'}
      >
        Каталог
      </BreadcrumbItem>
      <BreadcrumbItem
        className={clsx('font-semibold', 'max-w-60')}
        classNames={{
          separator: 'text-primary',
          item: 'inline truncate',
        }}
        href={categoryHref}
        title={categoryTitle || 'Все категории'}
      >
        {categoryTitle || 'Все категории'}
      </BreadcrumbItem>
      <BreadcrumbItem
        className={clsx('font-semibold', 'max-w-60')}
        classNames={{
          item: 'inline truncate text-primary opacity-100',
        }}
        href={`/products/${slug}`}
        isDisabled={true}
        title={`${title}`}
      >
        {title}
      </BreadcrumbItem>
    </BreadcrumbWrapper>
  );
};
export interface ServiceBreadcrumbProps {
  title: string;
  service: string;
  serviceSlug: string;
}

export const ServiceBreadcrumb: React.FC<ServiceBreadcrumbProps> = ({
  title,
  service,
  serviceSlug,
}) => {
  return (
    <BreadcrumbWrapper>
      <BreadcrumbItem
        className={clsx('font-semibold', 'max-w-60')}
        classNames={{
          item: 'inline truncate',
        }}
        href={`/${serviceSlug}`}
        title={service}
      >
        {service}
      </BreadcrumbItem>
      <BreadcrumbItem
        className={clsx('font-semibold', 'max-w-60')}
        classNames={{
          item: 'inline truncate font-semibold opacity-100',
        }}
        href={`/services/${serviceSlug}`}
        isDisabled={true}
        title={`${title}`}
      >
        {title}
      </BreadcrumbItem>
    </BreadcrumbWrapper>
  );
};

export function LightBreadcrumb({
  category,
  subcategory,
  baseUrl,
}: {
  category?: { title: string; currentSlug: string };
  subcategory?: { title: string; slug: string };
  baseUrl?: string;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 text-sm text-gray-600">
        <li>
          <Link className="flex items-center gap-1 hover:underline" href="/">
            <HomeIcon className="h-4 w-4 text-gray-400" />
          </Link>
        </li>
        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
        <li>
          <Link href={`${baseUrl}/all`}>Каталог</Link>
        </li>

        {category && (
          <>
            {subcategory ? (
              <>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                <li>
                  <Link
                    className={clsx('hover:underline', {
                      'text-primary font-semibold': !subcategory,
                    })}
                    href={`${baseUrl}/${category.currentSlug}`}
                  >
                    {category.title}
                  </Link>
                </li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                <li className="text-primary font-semibold">{subcategory.title}</li>
              </>
            ) : (
              <>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                <li className="text-primary font-semibold">{category.title}</li>
              </>
            )}
          </>
        )}
      </ol>
    </nav>
  );
}
