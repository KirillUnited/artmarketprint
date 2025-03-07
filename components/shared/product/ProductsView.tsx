'use client';
import React from 'react'
import ProductsFilter from './ProductsFilter'
import ProductList from './ProductList'
import Pagination from '@/components/ui/Pagination'
import RelatedProductsCarousel from './RelatedProductsCarousel'
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';

export default function ProductsView({ products, categories }: any) {
    const [filteredItems, setFilteredItems] = React.useState(products);
    const [sortedItems, setSortedItems] = React.useState(products);
    return (
        <div className='flex flex-col gap-8'>
            <ProductsFilter categories={categories} products={products} sortedProducts={setSortedItems} />
            {/* <ProductList items={products} /> */}
            {/* <RelatedProductsCarousel relatedProducts={sortedItems} /> */}
            <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
                {sortedItems?.map((item: any) => (
                    <li key={`${item?.id["#text"]}`}>
                        <Card className="h-full group relative max-w-full shadow-sm" radius="sm" >
                            <CardBody as={Link} href={`/products/${item?.id["#text"]}`}>
                                <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                                <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${item.price} BYN`}</span>
                                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{item.product?.__cdata}</h3>
                                <p className="text-gray-600 line-clamp-2">{item.general_description?.__cdata}</p>
                            </CardBody>
                            <CardFooter>
                                <Button as={Link} target='_blank' href={`/products/${item?.id["#text"]}`} size="md" color='secondary' radius='sm'>Подробнее</Button>
                            </CardFooter>
                        </Card>
                    </li>
                ))}
            </ul>
            <Pagination total={10} className='self-center' />
        </div>
    )
}
