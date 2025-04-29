'use client';

import Loader from '@/components/ui/Loader';
import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

const colors = [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
];
const sizes = [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
];

export const ProductDetails: React.FC<{ children?: React.ReactNode }> = () => {
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedSize, setSelectedSize] = useState(sizes[2])
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;


    return (
        <div className='flex flex-col gap-4'>
            {/* Color picker */}
            <fieldset aria-label="Choose a color">
                <RadioGroup label="Цвет" orientation='horizontal' defaultValue={selectedColor.name} classNames={{
                    label: 'text-foreground'
                }}>
                    {colors.map((color) => (
                        <Radio
                            key={color.name}
                            value={color.name}
                            aria-label={color.name}
                            classNames={{
                                base: 'data-[disabled=true]:cursor-not-allowed',
                                wrapper: clsx(color.bgColor, 'size-8 rounded-full group-data-[selected=true]:ring-2 ring-offset-2 ring-primary', `group-data-[hover-unselected=true]:${color.bgColor}`),
                                control: clsx('hidden'),
                                hiddenInput: 'disabled:cursor-not-allowed',
                            }}
                        >
                        </Radio>
                    ))}
                </RadioGroup>
            </fieldset>

            {/* Size picker */}
            <fieldset aria-label="Choose a size">
                <RadioGroup
                    label="Размер"
                    orientation='horizontal'
                    defaultValue={selectedSize.name}
                    classNames={{
                        wrapper: 'grid grid-cols-3 gap-3 sm:grid-cols-6',
                        label: 'text-foreground'
                    }}
                >
                    {sizes.map((size) => (
                        <Radio
                            key={size.name}
                            value={size.name}
                            isDisabled={!size.inStock}
                            size='lg'
                            classNames={{
                                base: clsx(
                                    'data-[selected=true]:border-primary data-[selected=true]:ring-2 ring-offset-2 ring-primary data-[selected=true]:bg-primary data-[selected=true]:text-white border-gray-300 border-1 data-[disabled=true]:cursor-not-allowed pointer-events-auto',
                                    "inline-flex m-0 items-center justify-center",
                                    "max-w-[300px] cursor-pointer rounded-small gap-4 p-3",
                                    'uppercase text-sm',
                                ),
                                hiddenInput: 'disabled:cursor-not-allowed',
                                label: clsx(
                                    'group-data-[selected=true]:text-white text-sm font-semibold',
                                ),
                                wrapper: clsx(
                                    'hidden'
                                ),
                                labelWrapper: clsx(
                                    'ms-0'
                                )
                            }}
                        >
                            {size.name}
                        </Radio>
                    ))}
                </RadioGroup>
            </fieldset>
        </div>
    )
}
