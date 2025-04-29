'use client';

import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import React, { useState } from 'react'

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

    return (
        <div className='flex flex-col gap-4'>
            {/* Color picker */}
            <fieldset aria-label="Choose a color">
                <RadioGroup label="Цвет" orientation='horizontal' defaultValue={selectedColor.name}>
                    {colors.map((color) => (
                        <Radio
                            key={color.name}
                            value={color.name}
                            aria-label={color.name}
                            classNames={{
                                base: 'data-[disabled=true]:cursor-not-allowed',
                                wrapper: clsx(color.bgColor, 'size-8 rounded-full border-3', `group-data-[hover-unselected=true]:${color.bgColor}`),
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
                >
                    {sizes.map((size) => (
                        <Radio
                            key={size.name}
                            value={size.name}
                            isDisabled={!size.inStock}
                            classNames={{
                                base: clsx(
                                    'data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-white border-gray-400 border-1 data-[disabled=true]:cursor-not-allowed pointer-events-auto',
                                    "inline-flex m-0 items-center justify-between",
                                    "max-w-[300px] cursor-pointer rounded-small gap-4 p-4",
                                    'uppercase text-sm',
                                ),
                                hiddenInput: 'disabled:cursor-not-allowed',
                                label: clsx(
                                    'group-data-[selected=true]:text-white'
                                ),
                                control: clsx(
                                    'hidden'
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
