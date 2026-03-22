'use client';
import React, {JSX, useEffect, useState} from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { usePathname } from 'next/navigation';
import {ChevronRightIcon, HomeIcon} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

import { fetchNavigation, getCategorySlugFromNavMap } from '@/lib/fetchNavigation';

import { BreadcrumbListJsonLd } from '../ServiceJsonLd';

export const BreadcrumbWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<Breadcrumbs classNames={{
			list: 'border'
		}} variant='bordered'>
			<BreadcrumbItem className="font-semibold text-primary" href="/" title={'Главная'}>
				<HomeIcon aria-label='Home' size={18} />
			</BreadcrumbItem>
			{children}
		</Breadcrumbs>
	)
};

export default function BaseBreadcrumb({ items, section, withJsonLd }: { items: any, section?: string, withJsonLd?: boolean }): JSX.Element {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const [navigation, setNavigation] = useState<any>({});

	useEffect(() => {
		const navMap = fetchNavigation(items);

		setNavigation(navMap);
	}, []);

	return (
		<>
			{withJsonLd && <BreadcrumbListJsonLd name={navigation[`${pathSegments[pathSegments.length - 1]}`]} />}
			<Breadcrumbs variant='bordered'>
				<BreadcrumbItem className="font-semibold text-primary" href="/">
					<HomeIcon aria-label='Home' size={18} />
				</BreadcrumbItem>
				{
					pathSegments.length > 0 && pathSegments.map((segment: any, index: number) => {
						const href = '/' + pathSegments.slice(0, index + 1).join('/');
						const isLast = index === pathSegments.length - 1;
						const title = navigation[`${pathSegments[index]}`] || decodeURIComponent(pathSegments[index]);

						return (
							<BreadcrumbItem key={href} className={clsx(
								'font-semibold',
								'max-w-60'
							)} classNames={{
								separator: 'text-primary',
								item: 'inline truncate',
							}}
								href={`${href}`}
								isDisabled={isLast}
								title={title}>
								{title}
							</BreadcrumbItem>
						)
					}
					)
				}
			</Breadcrumbs>
		</>
	);
}

export interface ProductBreadcrumbProps {
	category: string;
	title: string;
	slug: string;
	items: any;
}

export const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = (
	{
		category,
		title,
		slug,
		items
	}
) => {
	const navMap = fetchNavigation(items);
	const categorySlug = getCategorySlugFromNavMap(navMap, category);

	return (
		<BreadcrumbWrapper>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={'/products/categories/all'}
				title={'Каталог'}>
				Каталог
			</BreadcrumbItem>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={`/products/categories/${categorySlug}`}
				title={`${category}`}>
				{category}
			</BreadcrumbItem>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={`/products/${slug}`}
				isDisabled={true}
				title={`${title}`}
			>
				{title}
			</BreadcrumbItem>
		</BreadcrumbWrapper>
	)
}
export interface ServiceBreadcrumbProps {
	title: string;
	service: string;
	serviceSlug: string;
}

export const ServiceBreadcrumb: React.FC<ServiceBreadcrumbProps> = (
	{
		title,
		service,
		serviceSlug
	}
) => {
	return (
		<BreadcrumbWrapper>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={`/${serviceSlug}`}
				title={service}>
				{service}
			</BreadcrumbItem>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={`/services/${serviceSlug}`}
				isDisabled={true}
				title={`${title}`}
			>
				{title}
			</BreadcrumbItem>
		</BreadcrumbWrapper>
	)
}

export function LightBreadcrumb({
									   category,
									   subcategory,
										baseUrl
								   }: {
	category?: { title: string; currentSlug: string }
	subcategory?: { title: string; slug: string }
	baseUrl?: string
}) {
	return (
		<nav aria-label="Breadcrumb">
			<ol className="flex flex-wrap gap-2 text-sm text-gray-600">
				<li>
					<Link className="hover:underline flex items-center gap-1" href="/">
						<HomeIcon className="w-4 h-4 text-gray-400" />
						Главная
					</Link>
				</li>
				<ChevronRightIcon className="w-4 h-4 text-gray-400" />

				{category && (
					<>
						<li>
							<Link
								className="hover:underline"
								href={`${baseUrl}/${category.currentSlug}`}
							>
								{category.title}
							</Link>
						</li>
						{subcategory && (
							<>
								<ChevronRightIcon className="w-4 h-4 text-gray-400" />
								<li className="text-gray-900 font-medium">{subcategory.title}</li>
							</>
						)}
					</>
				)}
			</ol>
		</nav>
	)
}