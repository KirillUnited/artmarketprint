'use client'

import { getPrice } from '@/lib/getPrice';
import useBasketStore from '@/store/store';
import { Product, ProductData } from '@/types/product.types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { ArrowUpRightIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

// Types

interface QuantityControlsProps {
    itemCount: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

interface AddToBasketButtonProps {
    product: Product;
}

// Product helper functions
const extractProductData = (product: Product): ProductData => ({
    id: product.id[0]._,
    name: product.product[0]._,
    price: parseFloat(getPrice(product.price[0], 1.1)),
    quantity: 1
});

// Components
const QuantityControls: React.FC<QuantityControlsProps> = ({ itemCount, onDecrease, onIncrease }) => (
    <div className="flex items-center gap-2 flex-1">
        <Button
            isIconOnly
            className="bg-default-100 hover:bg-default-200"
            radius="sm"
            size="md"
            onPress={onDecrease}
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
            onPress={onIncrease}
        >
            <PlusIcon size={16} />
        </Button>
    </div>
);

const ViewBasketButton: React.FC = () => (
    <Button
        className="flex-grow basis-40 uppercase group border-1"
        radius="sm"
        size="md"
        as={Link}
        href="/basket"
        target='_blank'
        variant='ghost'
        color='primary'
    >
        В корзину
        <ArrowUpRightIcon size={18}
            className='group-hover:translate-x-1 transition-transform duration-300' />
    </Button>
);

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({ product }) => {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const [isClient, setIsClient] = React.useState(false);
    
    const productData = extractProductData(product);
    const itemCount = getItemCount(productData.id);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const handleAddItem = () => addItem(productData);
    const handleRemoveItem = () => removeItem(productData.id);

    return (
        <div className="flex flex-wrap gap-4 w-full">
            {itemCount > 0 ? (
                <>
                    <QuantityControls
                        itemCount={itemCount}
                        onDecrease={handleRemoveItem}
                        onIncrease={handleAddItem}
                    />
                    <ViewBasketButton />
                </>
            ) : (
                <Button
                    className="bg-brand-gradient font-semibold flex-grow basis-40 uppercase text-primary-foreground group"
                    radius="sm"
                    size="md"
                    onPress={handleAddItem}
                >
                    <ShoppingCartIcon size={18}
                        className='group-hover:scale-110 transition-transform duration-300' />
                    <span>В корзину</span>
                </Button>
            )}
        </div>
    );
};

export default AddToBasketButton;