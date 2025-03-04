import { getProductBySlug } from "@/lib/actions/product.actions";

export interface Props {
    slug: string,
    id?: number
}

export default async function ProductPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return <div>Product not found</div>
    
    console.log('product', product)

    return (
        <div>Product: {product.product?.__cdata || 'Not found'}</div>
    )
}
