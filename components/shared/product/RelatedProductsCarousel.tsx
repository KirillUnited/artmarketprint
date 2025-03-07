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
import { Link } from '@heroui/link';

export default function RelatedProductsCarousel({ relatedProducts }: any) {
    console.log(relatedProducts);
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation]}
            navigation={true}
            className='max-w-full'
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            }}
        >
            {relatedProducts?.map((item: any) => (
                <SwiperSlide key={`${item?.id["#text"]}`}>
                    <Card className="h-full group relative max-w-full shadow-sm" radius="sm" >
                        <CardBody as={Link} href={`/products/${item?.id["#text"]}`}>
                            <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                            <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{item.product?.__cdata}</h3>
                            <p className="text-gray-600 line-clamp-2">{item.general_description?.__cdata}</p>
                        </CardBody>
                        <CardFooter>
                            <Button as={Link} target='_blank' href={`/products/${item?.id["#text"]}`} size="md" color='secondary' radius='sm'>Подробнее</Button>
                        </CardFooter>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
