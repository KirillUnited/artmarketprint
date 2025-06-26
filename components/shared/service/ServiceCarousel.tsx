'use client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/order
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

import styles from './service.module.css';

import Loader from '@/components/ui/Loader';
import {urlFor} from "@/sanity/lib/image";

interface CarouselProps {
    items?: any;
    className?: string
}

export const ServiceCarousel = ({ items, className }: CarouselProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <div className={clsx(styles['swiper-container'], className)}>
            <Swiper
                className={clsx(styles['swiper'], styles['mySwiper2'])}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {items.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles['swiper-slide']}>
                        <picture className='h-full rounded-small'>
                            <Image priority as={NextImage} quality={60} removeWrapper alt={'image'} className={'w-full aspect-square max-h-full'}
                                classNames={{ wrapper: 'bg-cover' }} width={500} height={500} src={urlFor(item).width(500).height(500).url()} radius='sm' fallbackSrc={`/images/product-no-image.jpg`} />
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
                {items.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles['swiper-slide']} >
                        <picture className='h-full border-slate-300 border p-3'>
                            <Image as={NextImage} alt={'image'} className={'w-full aspect-square max-h-full object-contain'}
                                classNames={{ wrapper: 'bg-cover' }} src={urlFor(item).width(104).height(104).url()} width={104} height={104} radius='sm' fallbackSrc={`/images/product-no-image.jpg`} quality={10} />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
