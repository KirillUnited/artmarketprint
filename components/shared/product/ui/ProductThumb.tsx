'use client';
import {FC, JSX} from 'react';
import {Card, CardBody, CardFooter} from '@heroui/card';
import {Link} from '@heroui/link';
import NextImage from 'next/image';
import clsx from 'clsx';
import {Image} from '@heroui/image';

import {ProductColors} from '../ProductColors';
import {ProductSizes} from '../ProductSizes';

import {ProductData} from '@/components/shared/product/product.types';
import {getTotalStock} from '@/components/shared/product/lib';
import {CURRENCIES_SYMBOLS} from '@/lib/products/companies';

interface ProductThumbProps extends React.HTMLAttributes<HTMLDivElement> {
	item: ProductData;
}

/**
 * Renders a product thumbnail card with an image, title, description, and price.
 *
 * @returns {JSX.Element} The JSX element representing the product thumbnail card.
 */
const ProductThumb: FC<ProductThumbProps> = ({item, ...props}): JSX.Element => {
	const id = item.id || item._id || '';
	const price = item.price || 0;
	const name = item.name || '';
	const image = item?.image || '/images/product-no-image.jpg';
	const totalStock = getTotalStock(item.items);
	const brand = item.brand || '';

	return (
		<Card as={Link} className={clsx('h-full group relative max-w-full shadow-small hover:shadow-large transition-all duration-300', props.className)} href={`/products/${id}`} radius="sm">
			<CardBody className="items-stretch gap-4 p-2 sm:p-4">
				<div className="relative overflow-hidden rounded-lg group">
					<Image
						alt={name}
						as={NextImage}
						className={clsx('object-contain aspect-square w-full mx-auto max-w-56 max-h-80 group-hover:scale-105 transition-transform duration-300')}
						classNames={{
							wrapper: clsx('relative w-full bg-contain bg-center bg-no-repeat mx-auto'),
						}}
						height={220}
						loading="lazy"
						quality={75}
						src={image}
						width={220}
						placeholder="blur"
						blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+"
						onLoadingComplete={(img: HTMLImageElement) => {
							// Add fade-in animation when image loads
							img.classList.add('animate-fadeIn');
						}}
					/>
					{Number(totalStock()) === 0 && (
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<span className="text-white font-medium px-3 py-1 bg-red-500 rounded-full text-sm">Нет в наличии</span>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-xl font-semibold self-start text-foreground">{`${price} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}`}</span>
					{name && (
						<p className="flex flex-col text-foreground/90 text-xs sm:text-sm" title={name}>
							{brand && <span className="text-xs text-gray-500 font-light">{brand}</span>}
							<span className="line-clamp-2">{name}</span>
						</p>
					)}
					<span className="text-gray-500 font-light text-xs truncate w-full">
						{Number(totalStock()) > 0 ? `В наличии (${totalStock()})` : <span className="text-red-500">Нет в наличии</span>}
					</span>
				</div>
			</CardBody>
			{(item.colors?.length > 0 || item.sizes?.length > 0) && (
				<CardFooter className="text-tiny flex-col items-start gap-2 border-t p-4 pt-2">
					{item.colors?.length > 0 && <ProductColors list={item.items} />}
					{item.sizes?.length > 0 && <ProductSizes list={item.sizes} />}
				</CardFooter>
			)}
		</Card>
	);
};

export default ProductThumb;
