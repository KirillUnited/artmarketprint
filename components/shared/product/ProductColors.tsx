import React from 'react'
import NextImage from 'next/image'

interface ColorItem {
    id: string;
    color: string;
    cover: string;
}

const ColorListItem = ({ item }: { item: ColorItem }) => (
    <li key={item.id}>
        <NextImage
            alt={item.color}
            src={item.cover}
            width={36}
            height={36}
            className="object-contain aspect-square"
            quality={10}
            title={item.color}
        />
    </li>
);

const ColorList = ({ items }: { items: ColorItem[] }) => (
    <ul className='flex gap-2 flex-wrap'>
        {items?.map((item) => (
            <ColorListItem key={item.id} item={item} />
        ))}
    </ul>
);

const ProductColorsWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-1'>
        <span className='font-semibold'>Варианты:</span>
        {children}
    </div>
);

export const ProductColors = ({ list }: { list: ColorItem[] }) => {
    return (
        <ProductColorsWrapper>
            <ColorList items={list} />
        </ProductColorsWrapper>
    );
};
