'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import {  Navigation } from 'swiper/modules';
import { Image } from '@heroui/image';

export default function RelatedProductsCarousel({ relatedProducts }: any) {
    console.log(relatedProducts);
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            modules={[Navigation]}
            navigation={true}
            className='max-w-full'
        >
            {relatedProducts?.map((item: any) => (
                <SwiperSlide key={`${item?.id["#text"]}`}>
                    <Card className="h-full group relative max-w-full" radius="sm" >
                        <CardBody>
                            <Image removeWrapper alt={item.altText} className="object-cover aspect-square" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                            <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">{item.product?.__cdata}</h3>
                            <p className="text-gray-600 line-clamp-1">{item.general_description?.__cdata}</p>
                        </CardBody>
                        <CardFooter>
                            <Button>Подробнее</Button>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
