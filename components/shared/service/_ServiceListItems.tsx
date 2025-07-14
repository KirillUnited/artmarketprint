'use client';
import {useCallback, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, FreeMode, Navigation, Pagination} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {SanityDocument} from 'next-sanity';
import {JSX} from 'react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {ChevronLeft, ChevronRight, LoaderIcon} from "lucide-react";
import {ServicePreview} from "@/components/shared/service/ServicePreview";
import {Button} from "@heroui/button";
import {cn} from "@/lib/utils";

interface ServiceListItemsProps {
	services?: SanityDocument[];
}

export default function ServiceListItems({services}: ServiceListItemsProps): JSX.Element {
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

	return (
		<div className="w-full relative">
			<Swiper
				onSwiper={setSwiper}
				slidesPerView={isMobile ? 'auto' : 4}
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
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true
				}}
				breakpoints={{
					320: {
						slidesPerView: 'auto',
						spaceBetween: 16,
						freeMode: true,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 16,
						freeMode: false,
					},
				}}
			>
				{services?.map((service: any) => (
					<SwiperSlide key={service.title} className={isMobile ? 'w-auto' : 'w-full'}>
						<ServicePreview service={service} />
					</SwiperSlide>
				))}
			</Swiper>
			{!isMobile && (
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
}
