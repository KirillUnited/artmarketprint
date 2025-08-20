// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
    return (
		<Link className="border rounded p-4 shadow hover:shadow-lg transition" href={`/products/${product.id}`}>

			<Image src={`${product.image || '/images/product-no-image.jpg'}`} alt={product.title || 'Product Image'} className="w-full h-40 object-cover" width={500} height={500} />
			<h3 className="mt-2 font-semibold">{product.name}</h3>
			<p className="text-gray-600">${product.price}</p>
		</Link>
	);
}
