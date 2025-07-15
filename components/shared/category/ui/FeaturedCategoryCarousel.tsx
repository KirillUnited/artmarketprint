'use client';

import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, LoaderIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { FeaturedCategoryThumb } from "@/components/shared/category/ui";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const ITEMS_PER_SLIDE: number = 4;

interface FeaturedCategoryCarouselProps {
    items?: any[];
}

export const FeaturedCategoryCarousel = ({ items }: FeaturedCategoryCarouselProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    const handlePrev = useCallback(() => {
        swiper?.slidePrev();
    }, [swiper]);

    const handleNext = useCallback(() => {
        swiper?.slideNext();
    }, [swiper]);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMounted) return <LoaderIcon className="relative top-auto left-auto mx-auto animate-spin text-primary" />;

    // Hide navigation if items are less than or equal to slides per view on desktop
    const shouldShowNavigation = !isMobile && items && items.length > ITEMS_PER_SLIDE;

    return (
        <div className="w-full relative">
            <Swiper
                onSwiper={setSwiper}
                slidesPerView={isMobile ? 'auto' : ITEMS_PER_SLIDE}
                spaceBetween={16}
                freeMode={isMobile}
                modules={[FreeMode, Navigation, Pagination, Autoplay]}
                navigation={false}
                pagination={{
                    clickable: true,
                    enabled: isMobile,
                    dynamicBullets: true
                }}
                className="w-full !pb-10 md:!pb-0 relative"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        freeMode: true,
                    },
                    768: {
                        slidesPerView: ITEMS_PER_SLIDE,
                        spaceBetween: 32,
                        freeMode: false,
                    },
                }}
            >
                {items?.map((item: any) => (
                    <SwiperSlide key={item.title} className={isMobile ? '!w-60' : 'w-full'}>
                        <FeaturedCategoryThumb item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {shouldShowNavigation && (
                <>
                    <Button
                        size="sm"
                        isIconOnly
                        onPress={handlePrev}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-gradient text-white shadow-lg transition-all hover:scale-110"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        size="sm"
                        isIconOnly
                        onPress={handleNext}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brand-gradient text-white shadow-lg transition-all hover:scale-110"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </>
            )}
        </div>
    );
};