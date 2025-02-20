'use client';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import HeroSection from './HeroSection';
import { heroSwiperParams } from '@/config/swiper';

export const HeroCarousel = ({ items }: any) => {
    if (!items || items.length === 0) return null;

    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            {...heroSwiperParams}
        >
            {
                items.map((item: any) => (
                    <SwiperSlide key={item._key}>
                        <HeroSection {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}