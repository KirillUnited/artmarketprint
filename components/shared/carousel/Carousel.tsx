'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, LoaderIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { FeaturedCategoryThumb } from "@/components/shared/category/ui";
import { ServicePreview } from "@/components/shared/service/ServicePreview";
import { clsx } from "clsx";
import styles from './carousel.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const ITEMS_PER_SLIDE = 4;
const MOBILE_BREAKPOINT = 768;

interface CarouselProps extends SwiperProps {
	items?: any[];
	type?: 'category' | 'service' | 'product';
}

const renderItem = (item: any, type?: 'category' | 'service' | 'product') => {
	if (!item) return null;

	switch (type) {
		case 'category':
			return <FeaturedCategoryThumb item={item} />;
		case 'service':
			return <ServicePreview service={item} />;
		default:
			return null;
	}
};

export const Carousel = ({ items, type, className }: CarouselProps) => {
	const [isMounted, setIsMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [swiper, setSwiper] = useState<SwiperType | null>(null);

	if (!Array.isArray(items) || items.length === 0) return null;

	useEffect(() => {
		setIsMounted(true);
		const handleResize = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (!isMounted) {
		return <LoaderIcon className="relative top-auto left-auto mx-auto animate-spin text-primary" />;
	}

	const shouldShowNavigation = !isMobile && items.length > ITEMS_PER_SLIDE;

	return (
		<div className={styles.carousel}>
			{isMobile ? (
				<div className={styles.nativeCarousel}>
					<div className={styles.carouselTrack}>
						{items.map((item) => (
							<div key={item.title} className={styles.carouselSlide}>
								{renderItem(item, type)}
							</div>
						))}
					</div>
				</div>
			) : (
				<>
					<Swiper
						onSwiper={setSwiper}
						slidesPerView={ITEMS_PER_SLIDE}
						spaceBetween={32}
						modules={[Navigation, Pagination, Autoplay]}
						className={clsx(styles.swiper, className || '')}
						speed={1000}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
						}}
						loop={true}
					>
						{items.map((item) => (
							<SwiperSlide key={item.title}>
								{renderItem(item, type)}
							</SwiperSlide>
						))}
					</Swiper>
					{shouldShowNavigation && (
						<>
							<Button
								size="sm"
								isIconOnly
								onPress={() => swiper?.slidePrev()}
								className={clsx(styles.swiperNavigation, 'left-0')}
							>
								<ChevronLeft className="h-6 w-6" />
							</Button>
							<Button
								size="sm"
								isIconOnly
								onPress={() => swiper?.slideNext()}
								className={clsx(styles.swiperNavigation, 'right-0')}
							>
								<ChevronRight className="h-6 w-6" />
							</Button>
						</>
					)}
				</>
			)}
		</div>
	);
};
