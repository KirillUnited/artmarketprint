'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './product.module.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import clsx from 'clsx';

interface HeroCarouselProps {
    items?: any;
    className?: string
}

export const ProductCarousel = ({ items, className }: HeroCarouselProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <div className={clsx(styles["swiper-container"], className)}>
            <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                spaceBetween={10}
                navigation={true}
                className={clsx(styles["swiper"], styles["mySwiper2"])}
            >
                {items.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles["swiper-slide"]}>
                        <picture className='h-full'>
                            <Image src={item} alt={'image'} width={500} height={500} className={'w-full aspect-square'} />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles["mySwiper"]}
            >
                {items.map((item: string, index: number) => (
                    <SwiperSlide key={index} className={styles["swiper-slide"]} >
                        <picture className='h-full border-slate-300 border p-3'>
                            <Image src={item} alt={'image'} className={'w-full'} width={150} height={150} />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
