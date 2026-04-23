'use client';

import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import {useEffect, useState, JSX} from 'react';
import { Tooltip } from '@heroui/tooltip';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';

import { useProductStore } from '@/store/product';
import Loader from '@/components/ui/Loader';

import ProductSizeTable from './ProductSizeTable';
import {ColorItemProps, ColorListItem, computedItems, MoreButton} from './ProductColors';
import { setSelectedColorURL } from './lib';

/**
 * A component to display a product thumbnail.
 *
 * @param {Object} props - Component props

/**
 * A component to display product details.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.colors - Array of color names
 * @param {string[]} props.sizes - Array of size names
 *
 * @returns {ReactElement} The component
 */
interface ProductDetailsProps {
    items: ColorItemProps[];
    sizes: string[];
    colors: string[];
    color: string;
    size: string;
}

export const ProductDetails: ({items, sizes, colors, color, size}: {
    items: any;
    sizes: any;
    colors: any;
    color: any;
    size: any
}) => (JSX.Element) = ({ items, sizes, colors, color, size }) => {
    const [isClient, setIsClient] = useState(false);
    const { selectedColor, selectedSize, setSelectedColor, setSelectedSize } = useProductStore();
    const [showAllColors, setShowAllColors] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const computedItemsByColor = computedItems(items);

    useEffect(() => {
        setIsClient(true);
        // Use the color prop if provided (from URL), otherwise use the first color
        if (color) {
            setSelectedColor(color);
        } else if (colors[0]) {
            setSelectedColor(colors[0]);
        }
        if (sizes[0]) setSelectedSize(sizes[0]);
    }, [color, colors, sizes]);

    if (!isClient) return <Loader className='static text-primary flex mx-auto' size='md' variant='spinner' />;

    return (
        <div className='flex flex-col gap-4'>
            {selectedColor && <p className='text-foreground text-sm'>Цвет: <span className='font-semibold'>{selectedColor}</span></p>}
            {/* {selectedSize && <p className='text-foreground font-semibold text-sm'>Выбранный размер: {selectedSize}</p>} */}
            {/* Color picker */}
            {
                Array.isArray(items) && items.length > 0 && (
                    <fieldset aria-label="Choose a color">
                        <RadioGroup
                            classNames={{
                                label: 'text-foreground font-semibold text-sm',
                                base: 'list-none'
                            }}
                            defaultValue={items[0].color}
                            label="Варианты"
                            orientation="horizontal"
                            value={selectedColor}
                            onChange={(value) => {
                                setSelectedColor(value.target.value)
                                setSelectedColorURL(value.target.value);
                            }}
                        >
                            {
                                (Array.isArray(items) && items.length > 0) && (
                                    <>
                                        {computedItemsByColor.slice(0, showAllColors ? items.length : 6).map((color) => (
                                            <Tooltip key={color.id} content={color.color} radius='sm'>
                                                <Radio
                                                    aria-label={color.color}
                                                    classNames={{
                                                        base: 'data-[disabled=true]:cursor-not-allowed data-[selected=true]:border-primary border-2 list-none pointer-events-auto m-0 rounded-small p-1',
                                                        control: clsx('hidden'),
                                                        hiddenInput: 'disabled:cursor-not-allowed',
                                                        wrapper: 'hidden',
                                                        labelWrapper: 'ms-0'
                                                    }}
                                                    name={'color'}
                                                    title={color.color}
                                                    value={color.color}
                                                >
                                                    <ColorListItem item={color} />
                                                </Radio>
                                            </Tooltip>
                                        ))
                                        }
                                        {(computedItemsByColor.length > 6 && !showAllColors) && <MoreButton onClick={() => setShowAllColors(!showAllColors)} />}
                                    </>
                                )
                            }
                        </RadioGroup>
                    </fieldset>
                )
            }

            {/* Size picker */}
            {
                Array.isArray(sizes) && sizes.length > 0 && (
                    <fieldset aria-label="Choose a size">
                        <div className="flex flex-col gap-2">
                            <RadioGroup
                                classNames={{
                                    wrapper: 'grid grid-cols-3 gap-3 sm:grid-cols-6',
                                }}
                                defaultValue={sizes[0]}
                                orientation='horizontal'
                                value={selectedSize}
                                onChange={(value) => {
                                    setSelectedSize(value.target.value)
                                }}
                            >
                            {sizes.sort((a: any, b: any) => a.localeCompare(b)).map((size) => (
                                <Radio
                                    key={size}
                                    aria-label={size}
                                    classNames={{
                                        base: clsx(
                                            'data-[selected=true]:border-primary data-[selected=true]:ring-2 ring-offset-2 ring-primary data-[selected=true]:bg-primary data-[selected=true]:text-white border-gray-300 border data-[disabled=true]:cursor-not-allowed pointer-events-auto',
                                            'inline-flex m-0 items-center justify-center',
                                            'max-w-[300px] cursor-pointer rounded-small gap-4 p-3',
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
                                    isDisabled={!size}
                                    name={'size'}
                                    size='lg'
                                    value={size}
                                >
                                    {size}
                                </Radio>
                            ))}
                            </RadioGroup>
                            <Button className='mt-4 border' radius='sm' size='sm' variant='bordered' onPress={onOpen}>Размерная таблица</Button>
                        </div>
                        <Modal className='bg-background max-w-fit' isOpen={isOpen} placement="top-center" radius='sm' title='Size Table' onOpenChange={onOpenChange}>
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1 text-2xl">Размерная таблица</ModalHeader>
                                <ModalBody className='min-w-fit'>
                                    <p className='text-foreground font-semibold text-sm'>👕 Мужской размерный ряд (Беларусь / Россия)</p>
                                    <ProductSizeTable gender={'male'} />
                                    <p className='text-foreground font-semibold text-sm mt-4'>👗 Женский размерный ряд (Беларусь / Россия)</p>
                                    <ProductSizeTable gender={'female'} />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </fieldset>
                )
            }
        </div>
    )
}
