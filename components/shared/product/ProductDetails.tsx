'use client';

import Loader from '@/components/ui/Loader';
import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

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
    items: Array<{ id: string, color: string, cover: string }>,
    sizes: string[]
}> = ({ items, sizes }) => {
    const [selectedColor, setSelectedColor] = useState<{ id: string, color: string, cover: string }>(items[0])
    const [selectedSize, setSelectedSize] = useState<string>(sizes[0])
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;


    return (
        <div className='flex flex-col gap-4'>
            {/* Color picker */}
            {
                Array.isArray(items) && items.length > 0 && (
                    <fieldset aria-label="Choose a color">
                        <RadioGroup
                            label="Цвет"
                            orientation="horizontal"
                            defaultValue={selectedColor.color}
                            classNames={{
                                label: "text-foreground font-semibold text-sm"
                            }}
                        >
                            {items.map((color) => (
                                <Radio
                                    key={color.id}
                                    value={color.color}
                                    aria-label={color.color}
                                    name={color.color}
                                    classNames={{
                                        base: "data-[disabled=true]:cursor-not-allowed",
                                        control: clsx("hidden"),
                                        hiddenInput: "disabled:cursor-not-allowed"
                                    }}
                                >
                                    <ul  className='flex gap-2 flex-wrap'>
                                        {
                                            items?.map((item: any) => {
                                                return (
                                                    <li key={item.id}>
                                                        <NextImage
                                                            alt={item.color}
                                                            src={item.cover} width={36} height={36}
                                                            className="object-contain aspect-square"
                                                            quality={10}
                                                            title={item.color}
                                                        />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
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
