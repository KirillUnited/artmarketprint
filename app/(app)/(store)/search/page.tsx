import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { ArrowLeftIcon, PanelRightOpenIcon, SearchXIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import Section, { SectionTitle } from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import { searchProductsByName } from '@/sanity/lib/product/searchProductsByName';
import { Button } from '@heroui/button';
import { FeaturedProducts } from '@/components/shared/product/FeaturedProducts';

type Props = {
    slug: string
}
export async function generateMetadata({ params }: { params: Promise<Props> }) {

    const url = `https://artmarketprint.by/search`;

    return {
        title: `Поиск`,
        
        alternates: {
            canonical: url,
        },
    }
}


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
                            <ProductsView products={products} totalItemsView={8} showFilter={true} />
                        </> :
                        <div className="flex flex-col items-center gap-8">
                            <Card className="lg:flex-row gap-8 self-stretch items-center p-4 w-fit mx-auto">
                                <div>
                                    <CardHeader>
                                        <p className='text-3xl font-bold'>{`Товар не найден`}</p>
                                    </CardHeader>
                                    <CardBody className="prose text-balance text-slate-500 block">
                                        <p>К сожалению, мы не нашли товаров по запросу <span className='font-bold'>&quot;{`${query}`}&quot;</span></p>
                                        <p>Рекомендуем:</p>
                                        <ul>
                                            <li>Проверьте правильность написания запроса</li>
                                            <li>Попробуйте использовать другие ключевые слова</li>
                                            <li>Проверьте наличие товара в <Link href="/products" className='text-primary'>каталоге</Link></li>
                                        </ul>
                                    </CardBody>
                                    <CardFooter className="gap-4 lg:flex-row flex-col items-stretch">
                                        <Button as={Link} className='uppercase font-semibold' href="/products" color='primary' variant='ghost' radius='sm'>
                                            <SearchXIcon className="w-6 h-6" />
                                            <span>Очистить поиск</span>
                                        </Button>
                                        <Button as={Link} href="/" color='primary' radius='sm' className='bg-brand-gradient uppercase font-semibold'>
                                            <PanelRightOpenIcon className="w-6 h-6" />
                                            На главную
                                        </Button>
                                    </CardFooter>
                                </div>

                                <ShoppingCart size={320} className="hidden lg:block m-4" />
                            </Card>
                            <div className='mt-10'><FeaturedProducts /></div>
                        </div>
                }
            </Section>
        )
    } catch (error) {
        console.error('Error fetching products:', error);

        return [];
    }
}
