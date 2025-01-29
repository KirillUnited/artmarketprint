'use client';
import React from 'react'
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useParams } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function BaseBreadcrumb({}) {
    const params = useParams();
    const { slug: paramsSlug } = params;
    const data = siteConfig?.catalogSection?.items.find(({ slug }) => slug === paramsSlug);
    const { title = '' } = data || {};

    return (
        <Breadcrumbs>
            <BreadcrumbItem href='/'>Главная</BreadcrumbItem>
            <BreadcrumbItem href='/catalog'>Каталог</BreadcrumbItem>
            <BreadcrumbItem href={`/catalog/${paramsSlug}`}>{title}</BreadcrumbItem>
        </Breadcrumbs>
    )
}
