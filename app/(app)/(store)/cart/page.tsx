'use client';
import Section, { SectionHeading, SectionTitle } from '@/components/layout/Section';
import useBasketStore from '@/store/store';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';

const CartPage = () => {
    const items = useBasketStore((state) => state.items);
    const removeItem = useBasketStore((state) => state.removeItem);
    const addItem = useBasketStore((state) => state.addItem);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // This is a workaround to prevent the component from rendering on the server
    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    if (!isClient) return null;

    console.log('BASKET CONTENT', items);

    if (items.length === 0) {
        return (
            <Section>
                <SectionHeading>
                    <SectionTitle>Корзина</SectionTitle>
                </SectionHeading>

                <div className='flex flex-col gap-4 items-center justify-center h-full'>
                    <p className='text-large font-medium'>Корзина пуста</p>
                    <p className='text-small text-foreground/80'>Добавьте товары в корзину</p>
                </div>
            </Section>
        )
    }
    return (
        <Section>
            <SectionHeading>
                <SectionTitle>Корзина</SectionTitle>
            </SectionHeading>

            <div className='flex flex-col gap-4'>
                {
                    isLoading ? <Loader /> :
                        items.map((item) => (
                            <Card key={item.id} shadow='sm' radius='sm'>
                                <CardBody className='flex flex-row gap-4 items-center'>
                                    <Image as={NextImage} src={item.image} alt={item.name} width={64} height={64} />
                                    <div className="flex-1 flex flex-col gap-0">
                                        <h1 className="text-large font-bold">{item.name}</h1>
                                        <p className="text-small text-foreground/80 line-clamp-2">Цена: <span className='text-base text-primary font-bold'>{item.price} р.</span></p>
                                        <p className="text-small text-foreground/80 line-clamp-2">Количество: {item.quantity} шт.</p>
                                    </div>
                                    <div className='basis-20'>
                                        <QuantityControls
                                            itemCount={item.quantity}
                                            onDecrease={() => removeItem(item.id)}
                                            onIncrease={() => addItem(item)} />
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                }
            </div>
        </Section>
    );
};

export default CartPage;