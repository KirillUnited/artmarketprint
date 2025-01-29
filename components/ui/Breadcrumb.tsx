'use client';
import React from 'react'
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useParams } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function BaseBreadcrumb() {
    const params = useParams();
    const { slug: paramsSlug } = params;
    const data = siteConfig?.serviceSection?.items.find(({ slug }) => slug === paramsSlug);
    const { title = '' } = data || {};

    return (
        <Breadcrumbs>
            <BreadcrumbItem href='/'>Главная</BreadcrumbItem>
            <BreadcrumbItem href='/services'>Услуги</BreadcrumbItem>
            <BreadcrumbItem href={`/services/${paramsSlug}`}>{title}</BreadcrumbItem>
        </Breadcrumbs>
    )
}
