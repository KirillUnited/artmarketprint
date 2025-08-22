'use client';
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import styles from './product.module.css';
import ProductThumb from './ui/ProductThumb';

import Loader from '@/components/ui/Loader';

export default function RelatedProductsCarousel({ relatedProducts }: any) {
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        setProducts(relatedProducts);
        setIsLoading(false);
    }, [relatedProducts]);

    if (isLoading) return <Loader size='md' variant='spinner' className='static text-primary flex mx-auto' />;


    return (
        <Swiper
            breakpoints={{
                640: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            }}
            className={styles.RelatedProductsSwiper}
            modules={[Navigation, Pagination]}
            navigation={false}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            slidesPerView={1}
            spaceBetween={10}
        >
            {products?.map((item: any) => {                
                return (
                    <SwiperSlide key={`${item?.id}`} className='lg:min-w-64 h-full'>
                        <ProductThumb item={item} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
