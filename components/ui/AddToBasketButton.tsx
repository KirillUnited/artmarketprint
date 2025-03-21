'use client'

import { extractProductData } from '@/lib/extract-product-data';
import useBasketStore from '@/store/store';
import { Product } from '@/types/product.types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { getCTAButton } from './BrandButton';
import { toast } from 'sonner';

// Types
interface QuantityControlsProps {
    itemCount: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

interface AddToBasketButtonProps {
    product: Product;
}

// Components
const QuantityControls: React.FC<QuantityControlsProps> = ({ itemCount, onDecrease, onIncrease }) => {
    const [inputValue, setInputValue] = React.useState(itemCount.toString());

    React.useEffect(() => {
        setInputValue(itemCount.toString());
    }, [itemCount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleInputBlur = () => {
        const newCount = parseInt(inputValue);
        if (isNaN(newCount) || newCount < 1) {
            setInputValue(itemCount.toString());
            return;
        }

        if (newCount > itemCount) {
            const diff = newCount - itemCount;
            for (let i = 0; i < diff; i++) {
                onIncrease();
            }
            toast.success('Количество товара обновлено');
        } else if (newCount < itemCount) {
            const diff = itemCount - newCount;
            for (let i = 0; i < diff; i++) {
                onDecrease();
            }
            toast.info('Количество товара обновлено');
        }
    };

    return (
        <div className="flex items-center gap-2 flex-1">
            <Button
                isIconOnly
                className="bg-default-100 hover:bg-default-200"
                radius="sm"
                size="md"
                onPress={() => {
                    onDecrease();
                    toast.info('Количество товара обновлено');
                }}
            >
                <MinusIcon size={20} className='text-secondary' />
            </Button>
            <Input
                type="number"
                value={inputValue}
                classNames={{
                    input: 'text-center min-w-12'
                }}
                min={1}
                size="md"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleInputBlur();
                    }
                }}
            />
            <Button
                isIconOnly
                className="bg-default-100 hover:bg-default-200"
                radius="sm"
                size="md"
                onPress={() => {
                    onIncrease();
                    toast.success('Количество товара обновлено');
                }}
            >
                <PlusIcon size={20} className='text-secondary' />
            </Button>
        </div>
    );
};

const ViewBasketButton: React.FC = () => (
    <div className='flex flex-col flex-grow basis-40'>
        {getCTAButton('view-basket', 'secondary', 'В корзине', '/cart', 'md')}
    </div>
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

    const handleAddItem = () => {
        addItem(productData);
        if (itemCount === 0) {
            toast.success('Товар добавлен в корзину');
        }
    };
    const handleRemoveItem = () => {
        removeItem(productData.id);
        if (itemCount === 1) {
            toast.info('Товар удален из корзины');
        }
    };

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

export { AddToBasketButton as default, QuantityControls, ViewBasketButton };