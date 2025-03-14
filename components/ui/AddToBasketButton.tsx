'use client'

import useBasketStore from '@/store/store';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import React, { useEffect } from 'react';

interface AddToBasketButtonProps {
    product: {
        id: {
            '_': string
        }
    }
}

export default function AddToBasketButton({ product }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product.id['_']);

    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
                <Button
                    isIconOnly
                    className="bg-default-100 hover:bg-default-200"
                    radius="sm"
                    size="md"
                    onPress={() => removeItem(product.id['_'])}
                >
                    <MinusIcon size={16} />
                </Button>
                <Input
                    type="text"
                    value={itemCount.toString()}
                    className="text-center min-w-12"
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
                        id: product.id['_'],
                        name: 'Product Name',
                        price: 100,
                        quantity: 1
                    })}
                >
                    <PlusIcon size={16} />
                </Button>
            </div>
            <Button
                className="bg-brand-gradient font-semibold flex-grow basis-40 uppercase text-primary-foreground group"
                radius="sm"
                size="md"
            >
                <ShoppingCartIcon size={18}
                    className='group-hover:scale-110 transition-transform duration-300' />
                <span>В корзину</span>
            </Button>
        </div>
    );
}