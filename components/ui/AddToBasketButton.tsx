'use client'

import { extractProductData } from '@/lib/extract-product-data';
import useBasketStore from '@/store/store';
import { Product } from '@/types/product.types';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { getCTAButton } from './BrandButton';

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
const QuantityControls: React.FC<QuantityControlsProps> = ({ itemCount, onDecrease, onIncrease }) => (
    <div className="flex items-center gap-2 flex-1">
        <Button
            isIconOnly
            className="bg-default-100 hover:bg-default-200"
            radius="sm"
            size="md"
            onPress={onDecrease}
        >
            <MinusIcon size={20} className='text-secondary' />
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
            <PlusIcon size={20} className='text-secondary' />
        </Button>
    </div>
);

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

export { AddToBasketButton as default, QuantityControls, ViewBasketButton };