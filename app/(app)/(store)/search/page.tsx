import { Card, CardBody } from '@heroui/card';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import Section, { SectionTitle } from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import { searchProductsByName } from '@/sanity/lib/product/searchProductsByName';

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{
        query: string
    }>
}) {
    const { query } = await searchParams;

    try {
        const products = await searchProductsByName(query);

        return (
            <Section>
                {
                    Array.isArray(products) && products.length > 0 ?
                        <>
                            <SectionTitle>{`Результаты поиска для "${query}" (${products.length} найдено)`}</SectionTitle>
                            <Link className="flex items-center gap-2 text-primary" href="/products">
                                <ArrowLeftIcon className="w-6 h-6" />
                                <span>Вернуться в каталог</span></Link>
                            <ProductsView products={products} totalItemsView={8} showFilter={false} />
                        </> :
                        <div className="flex flex-col items-center gap-8">
                            <SectionTitle>{`Товар не найден для "${query}"`}</SectionTitle>
                            <Card className="self-stretch items-center">
                                <CardBody className="text-center text-slate-500">
                                    <p>Попробуйте изменить запрос</p>
                                </CardBody>
                                <CardBody className="text-center items-center">
                                    <Link className="flex items-center gap-2 text-primary" href="/products">
                                        <ArrowLeftIcon className="w-6 h-6" />
                                        <span>Вернуться в каталог</span></Link>
                                </CardBody>
                            </Card>
                        </div>
                }
            </Section>
        )
    } catch (error) {
        console.error('Error fetching products:', error);

        return [];
    }
}
