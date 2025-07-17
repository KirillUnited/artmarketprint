'use client';

import { useCallback, useEffect, useState } from 'react';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, LoaderIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { FeaturedCategoryThumb } from "@/components/shared/category/ui";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {ServicePreview} from "@/components/shared/service/ServicePreview";
import {clsx} from "clsx";
import styles from './carousel.module.css';

const ITEMS_PER_SLIDE: number = 4;

interface CarouselProps extends SwiperProps {
    items?: any[];
    type?: 'category' | 'service' | 'product';
}

export const Carousel = ({ items, type, className }: CarouselProps) => {
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
				threshold={100}
				touchStartPreventDefault={true}
				onSwiper={setSwiper}
				slidesPerView={isMobile ? 'auto' : ITEMS_PER_SLIDE}
				spaceBetween={16}
				freeMode={isMobile}
				modules={[FreeMode, Navigation, Pagination, Autoplay]}
				navigation={false}
				pagination={{
					clickable: true,
					enabled: isMobile,
					dynamicBullets: true,
				}}
				className={clsx(
                    styles.swiper,
                    className || '',
                )}
				speed={1000}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				loop={true}
				breakpoints={{
					320: {
						slidesPerView: 'auto',
						spaceBetween: 16,
						freeMode: true,
						autoplay: false,
					},
					768: {
						slidesPerView: ITEMS_PER_SLIDE,
						spaceBetween: 32,
						freeMode: false,
						autoplay: true,
					},
				}}
			>
				{items?.map((item: any) => (
					<SwiperSlide key={item.title} className={isMobile ? '!w-60' : 'w-full'}>
						{type === 'category' && <FeaturedCategoryThumb item={item} />}
						{type === 'service' && <ServicePreview service={item} />}
					</SwiperSlide>
				))}
			</Swiper>
			{shouldShowNavigation && (
				<>
					<Button
						size="sm"
						isIconOnly
						onPress={handlePrev}
						className={clsx(
							styles['swiper-navigation'],
							'left-0',
						)}
					>
						<ChevronLeft className="h-6 w-6" />
					</Button>
					<Button
						size="sm"
						isIconOnly
						onPress={handleNext}
						className={clsx(
							styles['swiper-navigation'],
							'right-0',
						)}
					>
						<ChevronRight className="h-6 w-6" />
					</Button>
				</>
			)}
		</div>
	);
};