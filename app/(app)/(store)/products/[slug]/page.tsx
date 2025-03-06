import Section from "@/components/layout/Section";
import { ProductCarousel } from "@/components/shared/product";
import RelatedProducts from "@/components/shared/product/RelatedProducts";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import { getProductBySlug, getProductsByCategory } from "@/lib/actions/product.actions";
import { client } from "@/sanity/client";
import { NAVIGATION_QUERY } from "@/sanity/lib/page.query";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { SanityDocument } from "next-sanity";

export interface Props {
    slug: string,
    id?: number
}

export default async function ProductPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const breadcrumbs = (await client.fetch<SanityDocument>(NAVIGATION_QUERY))[0].links;

    if (!product) return <div className="text-center text-2xl mt-10 ">Товар не найден</div>

    const {
        product: { __cdata: title },
        general_description: { __cdata: general_description },
        variation_description: { __cdata: variation_description },
        price
    } = product || {};
    const productImages = product?.images_urls?.split(",");

    return (
        <>
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProductCarousel items={productImages} className="md:sticky top-16" />
                    <div className="flex flex-col gap-4">
                        <BaseBreadcrumb items={breadcrumbs} />
                        <article className="prose flex flex-col">
                            <h1 className="text-2xl">{title}</h1>
                            <Card className="bg-indigo-100">
                                <CardBody>
                                    <p className="my-0">
                                        Стоимость:
                                        <span className="text-3xl text-foreground font-bold">{` ${price} р`}</span></p>
                                </CardBody>
                                <CardFooter>
                                    <Button className="bg-brand-gradient font-semibold w-full uppercase text-primary-foreground"  size="md" radius="sm">Предзаказ</Button>
                                </CardFooter>
                            </Card>
                            <div dangerouslySetInnerHTML={{ __html: variation_description }} />
                        </article>
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
