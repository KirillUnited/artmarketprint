'use client';
import React, {JSX, useEffect, useState} from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { usePathname } from 'next/navigation';
import { HomeIcon } from 'lucide-react';
import clsx from 'clsx';
import { BreadcrumbListJsonLd } from '../ServiceJsonLd';
import { fetchNavigation, getCategorySlugFromNavMap } from '@/lib/fetchNavigation';

export const BreadcrumbWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<Breadcrumbs variant='bordered' classNames={{
			list: 'border-1'
		}}>
			<BreadcrumbItem className="font-semibold text-primary" href="/" title={`Главная`}>
				<HomeIcon size={18} aria-label='Home' />
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
					<HomeIcon size={18} aria-label='Home' />
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
				href={`/products`}
				title={`Каталог`}>
				Каталог
			</BreadcrumbItem>
			<BreadcrumbItem className={clsx(
				'font-semibold',
				'max-w-60'
			)} classNames={{
				separator: 'text-primary',
				item: 'inline truncate',
			}}
				href={`/categories/${categorySlug}`}
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
				title={`${title}`}
				isDisabled={true}
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
				title={`${title}`}
				isDisabled={true}
			>
				{title}
			</BreadcrumbItem>
		</BreadcrumbWrapper>
	)
}