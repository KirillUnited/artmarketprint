'use client'

import useBasketStore from '@/store/store';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { ArrowUpRightIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface AddToBasketButtonProps {
    product: {
        id: Array<{
            '_': string
        }>
        product: Array<{
            '_': string
        }>
        price: string
    }
}

export default function AddToBasketButton({ product }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount, items } = useBasketStore();
    const [isClient, setIsClient] = React.useState(false);
    const itemCount = getItemCount(product.id[0]['_']);
    const itemPrice = product.price[0];
    const itemName = product.product[0]['_'];
    const itemId = product.id[0]['_'];

    console.log(items);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="flex flex-wrap gap-4 w-full">
            {
                itemCount > 0 ? (
                    <>
                        <div className="flex items-center gap-2 flex-1">
                            <Button
                                isIconOnly
                                className="bg-default-100 hover:bg-default-200"
                                radius="sm"
                                size="md"
                                onPress={() => removeItem(product.id[0]._)}
                            >
                                <MinusIcon size={16} />
                            </Button>
                            <Input
                                type="text"
                                value={itemCount.toString()}
                                classNames={{
                                    input: 'text-center min-w-12'
                                }}
                                min={1}
                                size="md"
                                readOnly
                            />
                            <Button
                                isIconOnly
                                className="bg-default-100 hover:bg-default-200"
                                radius="sm"
                                size="md"
                                onPress={() => addItem({
                                    id: itemId,
                                    name: itemName,
                                    price: parseFloat(itemPrice),
                                    quantity: 1
                                })}
                            >
                                <PlusIcon size={16} />
                            </Button>
                        </div>

                        <Button
                            className="flex-grow basis-40 uppercase group"
                            radius="sm"
                            size="md"
                            as={Link}
                            href="/basket"
                            target='_blank'
                            variant='bordered'
                            color='primary'
                        >
                            В корзину
                            <ArrowUpRightIcon size={18}
                                className='group-hover:translate-x-1 transition-transform duration-300' />
                        </Button>
                    </>
                ) : (
                    <Button
                        className="bg-brand-gradient font-semibold flex-grow basis-40 uppercase text-primary-foreground group"
                        radius="sm"
                        size="md"
                        onPress={() => addItem({
                            id: itemId,
                            name: itemName,
                            price: parseFloat(itemPrice),
                            quantity: 1
                        })}
                    >
                        <ShoppingCartIcon size={18}
                            className='group-hover:scale-110 transition-transform duration-300' />
                        <span>В корзину</span>
                    </Button>
                )
            }

        </div>
    );
}