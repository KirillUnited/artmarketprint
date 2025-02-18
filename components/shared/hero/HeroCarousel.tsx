'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import HeroSection from './HeroSection';

export const HeroCarousel = () => {
    const swiperParams = {
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 1000,
        pagination: { clickable: true }
    };

    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            {...swiperParams}
        >
            <SwiperSlide>
                <HeroSection />
            </SwiperSlide>
            <SwiperSlide>
                <HeroSection />
            </SwiperSlide>
            <SwiperSlide>
                <HeroSection />
            </SwiperSlide>
        </Swiper>
    )
}