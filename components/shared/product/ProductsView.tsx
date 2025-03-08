'use client';
import React from 'react'
import ProductsFilter, { getCategory } from './ProductsFilter'
import Pagination from '@/components/ui/Pagination'
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';
import { getPrice } from '@/lib/getPrice';

export default function ProductsView({ products, categories }: any) {
    const [sortOrder, setSortOrder] = React.useState("asc");
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const handleFilterChange = (newSortOrder: string, newCategory: string) => {
        setSortOrder(newSortOrder);
        setSelectedCategory(newCategory);
    };
    const filteredProducts = (selectedCategory ? products
        .filter((product: any) => getCategory(product?.category) === selectedCategory) : products ?? [])
        .sort((a: any, b: any) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

    return (
        <div className='flex flex-col gap-8'>
            <ProductsFilter sortOrder={sortOrder}
                selectedCategory={selectedCategory}
                onFilterChange={handleFilterChange}
                categories={categories} />
            <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
                {filteredProducts?.map((item: any) => (
                    <li key={`${item?.id["#text"]}`}>
                        <Card className="h-full group relative max-w-full shadow-sm" radius="sm" >
                            <CardBody as={Link} href={`/products/${item?.id["#text"]}`} className='items-stretch'>
                                <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                                <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${getPrice(item.price, 1.1)} BYN`}</span>
                                <h3 className=" font-bold text-gray-900 line-clamp-2">{item.product?.__cdata}</h3>
                                <p className="text-gray-600 line-clamp-2 text-xs">{item.general_description?.__cdata}</p>
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
