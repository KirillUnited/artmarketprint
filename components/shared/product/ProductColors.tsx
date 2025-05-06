'use client'

import React from 'react'
import NextImage from 'next/image'
import { ColorItemProps } from './product.types';
import { filterItemsByColor } from './lib';
import Loader from '@/components/ui/Loader';

const ColorListItem = ({ item }: { item: ColorItemProps }) => (
    <li key={item.id}>
        <NextImage
            alt={item.color || "color"}
            src={item.cover}
            width={36}
            height={36}
            className="object-contain aspect-square"
            quality={10}
            title={item.color}
        />
    </li>
);

const ColorList = ({ items }: { items: ColorItemProps[] }) => {
    return (
        <ul className='flex gap-2 flex-wrap'>
            {items?.map((item) => (
                <ColorListItem key={item.id} item={item} />
            ))}
        </ul>
    )
};

const ProductColorsWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-1'>
        <span className='font-semibold'>Варианты:</span>
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