'use client'

import React from 'react'
import NextImage from 'next/image'
import { Image as HeroImage } from '@heroui/image'
import { Button } from '@heroui/button';
import { ChevronDownIcon, PlusIcon } from 'lucide-react';

import Loader from '@/components/ui/Loader';
import { shouldBypassNextImageOptimization } from '@/lib/image-utils';

import { ColorItemProps } from './product.types';
import { filterItemsByColor } from './lib';

const getItemPreviewSrc = (item: ColorItemProps & { image?: string; images_urls?: string | string[] }) => {
    if (item.cover) return item.cover;
    if (item.image) return item.image;
    if (Array.isArray(item.images_urls)) {
        const firstImagesGroup = item.images_urls[0];
        if (typeof firstImagesGroup === 'string') {
            return firstImagesGroup.split(',').map((image) => image.trim()).find(Boolean);
        }
    }
    if (typeof item.images_urls === 'string') {
        return item.images_urls.split(',').map((image) => image.trim()).find(Boolean);
    }

    return '';
};

const ColorListItem = ({
    item,
    onPreviewChange,
}: {
    item: ColorItemProps & { image?: string; images_urls?: string | string[] };
    onPreviewChange?: (image: string) => void;
}) => {
    const previewSrc = getItemPreviewSrc(item);

    return (
        <li
        key={item.id}
        className='cursor-pointer'
        onClick={() => previewSrc && onPreviewChange?.(previewSrc)}
        onMouseEnter={() => previewSrc && onPreviewChange?.(previewSrc)}
    >
        <HeroImage
            alt={item.color || 'color'}
            as={NextImage}
            className="object-contain aspect-square"
            classNames={{ wrapper: 'bg-cover' }}
            fallbackSrc="/images/product-no-image.jpg"
            height={36}
            quality={10}
            radius='sm'
            src={previewSrc || '/images/product-no-image.jpg'}
            title={item.color}
            unoptimized={shouldBypassNextImageOptimization(previewSrc)}
            width={36}
        />
    </li>
    );
};

export const MoreButton = ({ onClick }: { onClick: () => void }) => (
    <Button
        isIconOnly
        size='sm'
        variant='bordered'
        onPress={onClick}
        className='!gap-2 w-full'
    >
        <span>Ещё</span>
        <PlusIcon size={16} className='w-4 h-4' />
    </Button>
);

const ColorList = ({
    items,
    limit = 6,
    onPreviewChange,
    onPreviewReset,
}: {
    items: ColorItemProps[];
    limit?: number;
    onPreviewChange?: (image: string) => void;
    onPreviewReset?: () => void;
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const firstItems = items?.slice(0, limit);
    const otherItems = items?.slice(limit);

    return (
        <>
            <ul
                className='flex gap-2 flex-wrap hover:tailwind-effect'
                onMouseLeave={onPreviewReset}
            >
                {firstItems?.map((item) => (
                    <ColorListItem key={item.id} item={item} onPreviewChange={onPreviewChange} />
                ))}
                {showAll && otherItems?.map((item) => (
                    <ColorListItem key={item.id} item={item} onPreviewChange={onPreviewChange} />
                ))}
            </ul>

            {(otherItems?.length > 0 && !showAll) && (
                <MoreButton onClick={() => setShowAll(true)} />
            )}
        </>
    )
};

const ProductColorsWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-2'>
        {children}
    </div>
);

const computedItems = (list: ColorItemProps[]) => filterItemsByColor(list);

const ProductColors = ({
    list,
    onPreviewChange,
    onPreviewReset,
}: {
    list: ColorItemProps[];
    onPreviewChange?: (image: string) => void;
    onPreviewReset?: () => void;
}) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <Loader className='relative top-auto left-auto mx-auto' />
    if (!Array.isArray(list) || list.length === 0) return null;

    return (
        <ProductColorsWrapper>
            <ColorList
                items={computedItems(list)}
                onPreviewChange={onPreviewChange}
                onPreviewReset={onPreviewReset}
            />
        </ProductColorsWrapper>
    );
};

export {
    ProductColors,
    ProductColorsWrapper,
    ColorList,
    ColorListItem,
    computedItems,
}
export type { ColorItemProps }
