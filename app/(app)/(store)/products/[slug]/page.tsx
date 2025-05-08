import { Card, CardBody, CardFooter } from '@heroui/card';

import Section from '@/components/layout/Section';
import { ProductCarousel, ProductDetails } from '@/components/shared/product';
import RelatedProducts from '@/components/shared/product/RelatedProducts';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import getProductBySlug from '@/sanity/lib/product/getProductBySlug';
import { getPrice } from '@/lib/getPrice';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import AddToBasketButton from '@/components/ui/AddToBasketButton';
import ProductPrice from '@/components/shared/product/ProductPrice';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { Chip } from '@heroui/chip';

export interface Props {
    slug: string,
    id?: number
}

export const generateMetadata = async ({ params }: { params: Promise<Props> }) => {
    const { slug } = await params;
    const product: any = await getProductBySlug(slug);

    const url = `https://artmarketprint.by/products/${slug}`;

    return {
        title: product.name,
        description: product.description,

        openGraph: {
            title: `${product.name}`,
            description: `${product.description}`,
            images: [`${product.image}`],
            type: 'website',
            locale: 'ru',
            siteName: 'Art Market Print',
            url: `https://artmarketprint.by/products/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name}`,
            description: `${product.description}`,
            images: [`${product.image}`],
            creator: '@artmarketprint',
            site: '@artmarketprint',
            url: `https://artmarketprint.by/products/${slug}`,
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function ProductPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const [breadcrumbs, product] = await Promise.all([
        getSanityDocuments(NAVIGATION_QUERY),
        getProductBySlug(slug),
    ]);

    if (!product) return (
        <Section>
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <h2 className="text-2xl font-medium text-gray-600">Товар не найден</h2>
                <p className="text-gray-500">Товар, который вы ищете, не существует или был удален.</p>
            </div>
        </Section>
    )

    const {
        id,
        name: productTitle = '',
        description: general_description = '',
        variation_description = '',
        price = [],
        colors,
        sizes,
        category,
        items
    } = product as any || {};
    const productImages = (product as any)?.images_urls?.split(',') || [];
    const Heading = () => {
        return (
            <>
                <BaseBreadcrumb items={breadcrumbs[0].links} />
                <Chip className='self-start' size='sm' radius='sm' color='secondary'>{category}</Chip>
                <h1 className="text-2xl font-bold">{productTitle}</h1>
            </>
        )
    }

    return (
        <>
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className='flex flex-col gap-4 md:hidden'>
                        <Heading />
                    </div>
                    <ProductCarousel className="md:sticky top-16" items={productImages} />
                    <div className="flex flex-col gap-4">
                        <div className='hidden md:flex flex-col gap-4'>
                            <Heading />
                        </div>
                        <Card className="bg-indigo-100">
                            <CardBody>
                                <p className="my-0">
                                    <ProductPrice price={getPrice(price, 1.1)} productId={id} />
                                </p>
                            </CardBody>
                            <CardBody>
                                <ProductDetails 
                                    items={items} 
                                    sizes={sizes}
                                    colors={colors}
                                    color={items?.[0]?.color || ''} 
                                    size={sizes?.[0] || ''}
                                    // onColorChange={() => {}}
                                    // onSizeChange={() => {}}
                                />
                            </CardBody>
                            <CardFooter className='relative'>
                                <AddToBasketButton product={product as any} />
                            </CardFooter>
                        </Card>
                        <p className='text-foreground font-semibold text-sm'>Характеристики</p>
                        <article className="prose" dangerouslySetInnerHTML={{ __html: variation_description }} />
                    </div>
                </div>
                <article className="prose mt-8 max-w-full">
                    <h2>Описание</h2>
                    <p>
                        {general_description}
                    </p>
                </article>
            </Section>
            <RelatedProducts product={product} />
        </>
    )
}
