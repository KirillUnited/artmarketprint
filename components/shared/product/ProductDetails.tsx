'use client';

import Loader from '@/components/ui/Loader';
import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

/**
 * A component to display product details.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.colors - Array of color names
 * @param {string[]} props.sizes - Array of size names
 *
 * @returns {ReactElement} The component
 */
export const ProductDetails: React.FC<{
    colors: string[],
    sizes: string[]
}> = ({ colors, sizes }) => {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0])
    const [selectedSize, setSelectedSize] = useState<string>(sizes[0])
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;


    return (
        <div className='flex flex-col gap-4'>
            {/* Color picker */}
            {
                Array.isArray(colors) && colors.length > 0 && (
                    <fieldset aria-label="Choose a color">
                        <RadioGroup
                            label="Цвет"
                            orientation="horizontal"
                            defaultValue={selectedColor}
                            classNames={{
                                label: "text-foreground font-semibold text-sm"
                            }}
                        >
                            {colors.map((color) => (
                                <Radio
                                    key={color}
                                    value={color}
                                    aria-label={color}
                                    name={color}
                                    classNames={{
                                        base: "data-[disabled=true]:cursor-not-allowed",
                                        control: clsx("hidden"),
                                        hiddenInput: "disabled:cursor-not-allowed"
                                    }}
                                >
                                    {color}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </fieldset>
                )
            }

            {/* Size picker */}
            {
                Array.isArray(sizes) && sizes.length > 0 && (
                    <fieldset aria-label="Choose a size">
                        <RadioGroup
                            label="Размер"
                            orientation='horizontal'
                            defaultValue={selectedSize}
                            classNames={{
                                wrapper: 'grid grid-cols-3 gap-3 sm:grid-cols-6',
                                label: 'text-foreground font-semibold text-sm'
                            }}
                        >
                            {sizes.map((size) => (
                                <Radio
                                    key={size}
                                    value={size}
                                    isDisabled={!size}
                                    size='lg'
                                    name={size}
                                    aria-label={size}
                                    classNames={{
                                        base: clsx(
                                            'data-[selected=true]:border-primary data-[selected=true]:ring-2 ring-offset-2 ring-primary data-[selected=true]:bg-primary data-[selected=true]:text-white border-gray-300 border-1 data-[disabled=true]:cursor-not-allowed pointer-events-auto',
                                            "inline-flex m-0 items-center justify-center",
                                            "max-w-[300px] cursor-pointer rounded-small gap-4 p-3",
                                            'uppercase text-sm',
                                        ),
                                        hiddenInput: 'disabled:cursor-not-allowed',
                                        label: clsx(
                                            'group-data-[selected=true]:text-white text-sm font-medium',
                                        ),
                                        wrapper: clsx(
                                            'hidden'
                                        ),
                                        labelWrapper: clsx(
                                            'ms-0'
                                        )
                                    }}
                                >
                                    {size}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </fieldset>
                )
            }
        </div>
    )
}
