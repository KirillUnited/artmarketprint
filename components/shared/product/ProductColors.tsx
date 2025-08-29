'use client'

import React from 'react'
import NextImage from 'next/image'
import { Image as HeroImage } from '@heroui/image'
import { ColorItemProps } from './product.types';
import { filterItemsByColor } from './lib';
import Loader from '@/components/ui/Loader';
import { Button } from '@heroui/button';
import { ChevronDownIcon } from 'lucide-react';

const ColorListItem = ({ item }: { item: ColorItemProps }) => (
    <li key={item.id}>
        <HeroImage
            as={NextImage}
            alt={item.color || "color"}
            src={item.cover || "/images/product-no-image.jpg"}
            width={36}
            height={36}
            className="object-contain aspect-square"
            classNames={{ wrapper: 'bg-cover' }}
            quality={10}
            title={item.color}
            radius='sm'
            fallbackSrc="/images/product-no-image.jpg"
        />
    </li>
);

export const MoreButton = ({ onClick }: { onClick: () => void }) => (
    <li className='text-center'>
        <Button
            size='sm'
            isIconOnly
            variant='light'
            onPress={onClick}
        >
            <ChevronDownIcon size={16} />
        </Button>
    </li>
);

const ColorList = ({
    items,
    limit = 6,
}: {
    items: ColorItemProps[];
    limit?: number;
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const firstItems = items?.slice(0, limit);
    const otherItems = items?.slice(limit);

    return (
        <ul
            className='flex gap-2 flex-wrap hover:tailwind-effect'
        >
            {firstItems?.map((item) => (
                <ColorListItem key={item.id} item={item} />
            ))}
            {(otherItems?.length > 0 && !showAll) && (
                <MoreButton onClick={() => setShowAll(true)} />
            )}
            {showAll && otherItems?.map((item) => (
                <ColorListItem key={item.id} item={item} />
            ))}
        </ul>
    )
};

const ProductColorsWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-1'>
        {children}
    </div>
);

const computedItems = (list: ColorItemProps[]) => filterItemsByColor(list);

const ProductColors = ({ list }: { list: ColorItemProps[] }) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <Loader className='relative top-auto left-auto mx-auto' />
    if (!Array.isArray(list) || list.length === 0) return null;

    return (
        <ProductColorsWrapper>
            <ColorList items={computedItems(list)} />
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