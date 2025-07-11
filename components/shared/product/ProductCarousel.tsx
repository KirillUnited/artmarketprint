'use client';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import clsx from 'clsx';

import styles from './product.module.css';
import {useProductStore} from '@/store/product';
import Loader from '@/components/ui/Loader';
import {getVariantImages} from './lib';

interface ProductCarouselProps {
	items?: any;
	className?: string;
}

export const ProductCarousel = ({items, className}: ProductCarouselProps) => {
	const {selectedColor} = useProductStore();
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [isClient, setIsClient] = useState(false);
	const filteredImages = getVariantImages(items, selectedColor);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return <Loader className="relative top-auto left-auto mx-auto" />;

	if (!Array.isArray(filteredImages) || filteredImages.length === 0) return null;

	return (
		<div className={clsx(styles['swiper-container'], className)}>
			<Swiper className={clsx(styles['swiper'], styles['mySwiper2'])} modules={[FreeMode, Navigation, Thumbs]} navigation={true} spaceBetween={10} thumbs={{swiper: thumbsSwiper}}>
				{filteredImages.map((item: string, index: number) => {
					if (!item) return null;

					return (
						<SwiperSlide key={index} className={styles['swiper-slide']}>
							<picture className="h-full rounded-small">
								<Image
									as={NextImage}
									quality={60}
									removeWrapper
									alt={'image'}
									className={'w-full aspect-square max-h-full'}
									classNames={{wrapper: 'bg-cover'}}
									width={500}
									height={500}
									src={item}
									radius="sm"
									fallbackSrc={`/images/product-no-image.jpg`}
								/>
							</picture>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<Swiper
				className={styles['mySwiper']}
				freeMode={true}
				modules={[FreeMode, Navigation, Thumbs]}
				slidesPerView={4}
				spaceBetween={10}
				watchSlidesProgress={true}
				onSwiper={(swiper) => setThumbsSwiper(swiper)}
				breakpoints={{
					320: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
				}}
			>
				{filteredImages.map((item: string, index: number) => {
					if (!item) return null;

					return (
						<SwiperSlide key={index} className={styles['swiper-slide']}>
							<picture className="h-full border-slate-300 border p-3">
								<Image
									as={NextImage}
									alt={'image'}
									className={'w-full aspect-square max-h-full object-contain'}
									classNames={{wrapper: 'bg-cover'}}
									src={item}
									width={104}
									height={104}
									radius="sm"
									fallbackSrc={`/images/product-no-image.jpg`}
								/>
							</picture>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};
