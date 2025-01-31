'use client';
import React from 'react'
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useParams } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function BaseBreadcrumb({section}: {section: string}): JSX.Element {
    const params = useParams();
    const { slug: paramsSlug } = params;
    const page: any = section === 'catalog' ? siteConfig?.catalogSection : siteConfig?.serviceSection;
    const data = page?.items.find((item: any) => item.slug === paramsSlug);
    const { title = '' } = data || {};

    return (
		<Breadcrumbs>
			<BreadcrumbItem href="/" className="font-semibold">
				Главная
			</BreadcrumbItem>
			<BreadcrumbItem href={`/${section}`} className="font-semibold" isDisabled={!title}>
				Каталог
			</BreadcrumbItem>
			{title && <BreadcrumbItem href={`/${section}/${paramsSlug}`} isDisabled={true}>{title}</BreadcrumbItem>}
		</Breadcrumbs>
	);
}
