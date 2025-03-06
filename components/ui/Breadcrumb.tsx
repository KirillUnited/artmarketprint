'use client';
import React, { useEffect, useState } from 'react'
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useParams, usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { HomeIcon } from 'lucide-react';
import clsx from 'clsx';

export default function BaseBreadcrumb({ items, section }: { items: any, section?: string }): JSX.Element {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(Boolean);
	const [navigation, setNavigation] = useState<any>({});

	useEffect(() => {
		async function fetchNavigation() {
			const navMap: any = {};
			items?.forEach((nav: any) => {
				const navUrl = nav.url.split('/').filter(Boolean)[0];

				navMap[navUrl] = nav.title;

				if (nav.submenu) {
					nav.submenu[0].services.forEach((sub: any) => {
						navMap[sub.url] = sub.title;
					});
				}
			});
			setNavigation(navMap);
		}
		fetchNavigation();
	}, []);

	return (
		<Breadcrumbs variant='bordered'>
			<BreadcrumbItem href="/" className="font-semibold text-primary">
				<HomeIcon size={18} />
			</BreadcrumbItem>
			{
				pathSegments.length > 0 && pathSegments.map((segment: any, index: number) => {
					const href = '/' + pathSegments.slice(0, index + 1).join('/');
					const isLast = index === pathSegments.length - 1;
					const title = navigation[`${pathSegments[index]}`] || decodeURIComponent(pathSegments[index]);
					return (
						<BreadcrumbItem key={href} href={`${href}`} className={clsx(
							"font-semibold",
							"max-w-60"
						)}
						title={title}
						classNames={{
							separator: 'text-primary',
							item: 'inline truncate',
						}}
						isDisabled={isLast}>
							{title}
						</BreadcrumbItem>
					)
				}
				)
			}
		</Breadcrumbs>
	);
}
