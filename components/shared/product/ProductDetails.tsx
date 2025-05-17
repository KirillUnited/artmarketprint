'use client';

import Loader from '@/components/ui/Loader';
import { Radio, RadioGroup } from '@heroui/radio';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ColorListItem, computedItems } from './ProductColors';
import { Tooltip } from '@heroui/tooltip';
import { useProductStore } from '@/store/product';
import ProductSizeTable from './ProductSizeTable';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';

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
export const ProductDetails: React.FC<{
    items: Array<{ id: string, color: string, cover: string }>,
    colors: string[],
    sizes: string[],
    color: string,
    size: string,
}> = ({ items, sizes, colors, color, size }) => {
    const [isClient, setIsClient] = useState(false);
    const { selectedColor, selectedSize, setSelectedColor, setSelectedSize } = useProductStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        setIsClient(true);
        if (colors[0]) setSelectedColor(colors[0]);
        if (sizes[0]) setSelectedSize(sizes[0]);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;

    return (
        <div className='flex flex-col gap-4'>
            {/* Color picker */}
            {
                Array.isArray(items) && items.length > 0 && (
                    <fieldset aria-label="Choose a color">
                        <RadioGroup
                            label="Варианты"
                            orientation="horizontal"
                            defaultValue={items[0].color}
                            classNames={{
                                label: "text-foreground font-semibold text-sm",
                                base: "list-none"
                            }}
                            value={selectedColor}
                            onChange={(value) => {
                                setSelectedColor(value.target.value)
                            }}
                        >
                            {
                                (Array.isArray(items) && items.length > 0) && (
                                    computedItems(items).map((color) => (
                                        <Tooltip content={color.color} key={color.id} radius='sm'>
                                            <Radio
                                                value={color.color}
                                                aria-label={color.color}
                                                name={'color'}
                                                title={color.color}
                                                classNames={{
                                                    base: "data-[disabled=true]:cursor-not-allowed data-[selected=true]:border-primary border-2 list-none pointer-events-auto -m-0 rounded-small p-1",
                                                    control: clsx("hidden"),
                                                    hiddenInput: "disabled:cursor-not-allowed",
                                                    wrapper: "hidden",
                                                    labelWrapper: "ms-0"
                                                }}
                                            >
                                                <ColorListItem item={color} />
                                            </Radio>
                                        </Tooltip>
                                    ))
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
                        <RadioGroup
                            label="Размер"
                            orientation='horizontal'
                            defaultValue={sizes[0]}
                            classNames={{
                                wrapper: 'grid grid-cols-3 gap-3 sm:grid-cols-6',
                                label: 'text-foreground font-semibold text-sm'
                            }}
                            value={selectedSize}
                            onChange={(value) => {
                                setSelectedSize(value.target.value)
                            }}
                        >
                            {sizes.map((size) => (
                                <Radio
                                    key={size}
                                    value={size}
                                    isDisabled={!size}
                                    size='lg'
                                    name={'size'}
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
                        <Button variant='bordered' className='mt-4 border-1' size='sm' radius='sm' onPress={onOpen}>Размерная таблица</Button>
                        <Modal className='bg-background max-w-fit' isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} title='Size Table' radius='sm'>
                            <ModalContent>
                                <ModalHeader className="flex flex-col gap-1 text-2xl">Размерная таблица</ModalHeader>
                                <ModalBody className='min-w-fit'>
                                    <ProductSizeTable gender={'male'} />
                                    <ProductSizeTable gender={'female'} />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </fieldset>
                )
            }
            {selectedColor && <p className='text-foreground font-semibold text-sm'>Выбранный вариант: {selectedColor}</p>}
            {selectedSize && <p className='text-foreground font-semibold text-sm'>Выбранный размер: {selectedSize}</p>}
        </div>
    )
}
