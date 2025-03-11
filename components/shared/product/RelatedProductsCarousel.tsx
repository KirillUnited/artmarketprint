'use client';
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Image } from '@heroui/image';
import { Link } from '@heroui/link';
import Loader from '@/components/ui/Loader';
import { getPrice } from '@/lib/getPrice';
import styles from './product.module.css';

export default function RelatedProductsCarousel({ relatedProducts }: any) {
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        setProducts(relatedProducts);
        setIsLoading(false);
    }, [relatedProducts]);

    if (isLoading) return <Loader />;

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            modules={[Navigation, Pagination]}
            navigation={false}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            className={styles.RelatedProductsSwiper}
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
        >
            {products?.map((item: any) => (
                <SwiperSlide key={`${item?.id["#text"]}`} className='lg:min-w-64'>
                    <Card className="h-full group relative max-w-full shadow-sm" radius="sm" >
                        <CardBody as={Link} href={`/products/${item?.id["#text"]}`} className='items-stretch'>
                            <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                            <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${getPrice(item.price, 1.1)} BYN`}</span>
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
