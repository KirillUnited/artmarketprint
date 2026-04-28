// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { shouldBypassNextImageOptimization } from '@/lib/image-utils';

export default function ProductCard({ product }: { product: any }) {
	const imageSrc = `${product.image || '/images/product-no-image.jpg'}`;

    return (
		<Link className="border rounded p-4 shadow hover:shadow-lg transition" href={`/products/${product.id}`}>

			<Image alt={product.title || 'Product Image'} className="w-full h-40 object-cover" height={500} src={imageSrc} unoptimized={shouldBypassNextImageOptimization(imageSrc)} width={500} />
			<h3 className="mt-2 font-semibold">{product.name}</h3>
			<p className="text-gray-600">${product.price}</p>
		</Link>
	);
}
