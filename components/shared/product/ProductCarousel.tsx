'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import clsx from 'clsx';

import styles from './product.module.css';
import { useProductStore } from '@/store/product';
import Loader from '@/components/ui/Loader';

interface ProductCarouselProps {
    items?: any;
    className?: string
}

export const ProductCarousel = ({ items, className }: ProductCarouselProps) => {
    const { selectedColor } = useProductStore();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isClient, setIsClient] = useState(false)
    const productImages = (items as any)?.images_urls?.split(',') || [];

    if (!Array.isArray(productImages) || productImages.length === 0) return null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;
    const getFilteredImages = () => {
        if (!items?.items || !selectedColor) return productImages;
        
        const selectedVariant = items.items.find((item: any) => 
            item.color === selectedColor
        );
        
        if (!selectedVariant) return productImages;
        
        const variantImages = [
            selectedVariant.cover,
            ...(selectedVariant.images_urls[0].split(',') || [])
        ].filter(Boolean);

        console.log(selectedVariant)
        
        return variantImages.length > 0 ? variantImages : productImages;
    };
    const filteredImages = getFilteredImages();

    return (
        <div className={clsx(styles['swiper-container'], className)}>
            <Swiper
                className={clsx(styles['swiper'], styles['mySwiper2'])}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {filteredImages.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles['swiper-slide']}>
                        <picture className='h-full'>
                            <Image priority as={NextImage} quality={60} removeWrapper alt={'image'} className={'w-full aspect-square max-h-full'} width={500} height={500} src={item} radius='sm' />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                className={styles['mySwiper']}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs]}
                slidesPerView={4}
                spaceBetween={10}
                watchSlidesProgress={true}
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
            >
                {filteredImages.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles['swiper-slide']} >
                        <picture className='h-full border-slate-300 border p-3'>
                            <Image as={NextImage} removeWrapper alt={'image'} className={'w-full aspect-square max-h-full'} src={item} width={104} height={104} radius='sm' />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
