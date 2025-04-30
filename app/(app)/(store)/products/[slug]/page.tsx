import { Card, CardBody, CardFooter } from '@heroui/card';
import { SanityDocument } from 'next-sanity';

import Section from '@/components/layout/Section';
import { ProductCarousel, ProductDetails } from '@/components/shared/product';
import RelatedProducts from '@/components/shared/product/RelatedProducts';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { getPrice } from '@/lib/getPrice';
import { client } from '@/sanity/client';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import AddToBasketButton from '@/components/ui/AddToBasketButton';
import ProductPrice from '@/components/shared/product/ProductPrice';

export interface Props {
    slug: string,
    id?: number
}

export const generateMetadata = async ({ params }: { params: Promise<Props> }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    const url = `https://artmarketprint.by/products/${slug}`;

    return {
        title: product.product[0]['_'],
        description: product.general_description[0],

        openGraph: {
            title: `${product.product[0]['_']}`,
            description: `${product.general_description[0]}`,
            images: [`${product.images_urls[0].split(',')[0]}`],
            type: 'website',
            locale: 'ru',
            siteName: 'Art Market Print',
            url: `https://artmarketprint.by/products/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.product[0]['_']}`,
            description: `${product.general_description[0]}`,
            images: [`${product.images_urls[0].split(',')[0]}`],
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
    const product = await getProductBySlug(slug);
    const breadcrumbs = (await client.fetch<SanityDocument>(NAVIGATION_QUERY))[0].links;

    if (!product) return <div className="text-center text-2xl mt-10 ">Товар не найден</div>

    const {
        product: productTitle,
        general_description,
        variation_description,
        price
    } = product || {};
    const productImages = product?.images_urls[0].split(',');

    return (
        <>
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className='flex flex-col gap-4 md:hidden'>
                        <BaseBreadcrumb items={breadcrumbs} />
                        <h1 className="text-2xl font-bold">{productTitle[0]['_']}</h1>
                    </div>
                    <ProductCarousel className="md:sticky top-16" items={productImages} />
                    <div className="flex flex-col gap-4">
                        <div className='hidden md:flex flex-col gap-4'>
                            <BaseBreadcrumb items={breadcrumbs} />
                            <h1 className="text-2xl font-bold">{productTitle[0]['_']}</h1>
                        </div>
                        <Card className="bg-indigo-100">
                            <CardBody>
                                <p className="my-0">
                                    Стоимость:
                                    <ProductPrice price={getPrice(price[0], 1.1)} productId={product.id[0]['_']} />
                                </p>
                            </CardBody>
                            <CardBody>
                                <ProductDetails />
                            </CardBody>
                            <CardFooter className='relative'>
                                <AddToBasketButton product={product} />
                            </CardFooter>
                        </Card>
                        {/* <div className="mb-2">
                            <span className="text-gray-700 font-medium">Варианты:</span>
                            <ul className="mt-2 space-y-1">
                                {product.variations.map((variation: { color: string; size?: string }, idx: number) => (
                                    <li key={idx} className="text-gray-500">
                                        {variation.color} {variation.size && `- ${variation.size}`}
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                        <article className="prose" dangerouslySetInnerHTML={{ __html: variation_description[0] }} />
                    </div>
                </div>
                <article className="prose mt-8 max-w-full">
                    <h2>Описание</h2>
                    <p>
                        {general_description[0]}
                    </p>
                </article>
            </Section>
            <RelatedProducts product={product} />
        </>
    )
}
