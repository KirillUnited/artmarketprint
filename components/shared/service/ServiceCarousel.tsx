'use client';
import React, { useEffect, useRef, useState } from 'react';
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


import Loader from '@/components/ui/Loader';
import {urlFor} from '@/sanity/lib/image';

import styles from './service.module.css';

interface CarouselProps {
    items?: any;
    className?: string
}

export const ServiceCarousel = ({ items, className }: CarouselProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader className='relative top-auto left-auto mx-auto' />;

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <div className={clsx(styles['swiper-container'], className)}>
            <button
                ref={prevRef}
                type="button"
                aria-label="Previous slide"
                className={clsx('text-primary', styles['nav-button'], styles['nav-prev'])}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles['nav-icon']}
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            <button
                ref={nextRef}
                type="button"
                aria-label="Next slide"
                className={clsx('text-primary', styles['nav-button'], styles['nav-next'])}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles['nav-icon']}
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
            <Swiper
                className={clsx(styles['swiper'], styles['mySwiper2'])}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    const navigation = swiper.params.navigation;
                    if (navigation && typeof navigation !== 'boolean') {
                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;
                    }
                }}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {items.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles['swiper-slide']}>
                        <picture className='h-full rounded-small w-full'>
                            <Image priority removeWrapper alt={'image'} as={NextImage} className={'w-full max-h-full'} classNames={{ wrapper: 'bg-cover' }}
                                fallbackSrc={'/images/product-no-image.jpg'} height={500} quality={60} radius='sm' src={urlFor(item).width(500).height(500).url()} width={500} />
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
                        <picture className='h-full w-full border-slate-300 border p-3'>
                            <Image removeWrapper alt={'image'} as={NextImage} className={'w-full max-h-full object-cover'}
                                classNames={{ wrapper: 'bg-cover w-full max-w-full' }} fallbackSrc={'/images/product-no-image.jpg'} height={104} quality={10} radius='sm' src={urlFor(item).width(104).height(104).url()} width={104} />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
