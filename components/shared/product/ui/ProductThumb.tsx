'use client';
import { FC, JSX } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import NextImage from 'next/image';
import clsx from 'clsx';
import { Image } from '@heroui/image';

import { ProductData } from '@/components/shared/product/product.types';
import { getTotalStock } from '@/components/shared/product/lib';
import { CURRENCIES_SYMBOLS } from '@/lib/products/companies';
import { FavoriteButton } from '@/components/shared/favorites/FavoriteButton';

import { ProductSizes } from '../ProductSizes';
import { ProductColors } from '../ProductColors';

interface ProductThumbProps extends React.HTMLAttributes<HTMLDivElement> {
	item: ProductData;
}

/**
 * Renders a product thumbnail card with an image, title, description, and price.
 *
 * @returns {JSX.Element} The JSX element representing the product thumbnail card.
 */
const ProductThumb: FC<ProductThumbProps> = ({ item, ...props }): JSX.Element => {
	const id = item.id || item._id || '';
	const price = item.price || 0;
	const name = item.name || '';
	const image = item?.image || '/images/product-no-image.jpg';
	const totalStock = getTotalStock(item.items);
	const brand = item.brand || '';
	const category = item.category || '';

	return (
		<Card  className={clsx('h-full group relative max-w-full shadow-small hover:shadow-large transition-all duration-300', props.className)}  radius="sm">
			<CardBody as={Link} className="items-stretch gap-4 p-2 sm:p-4" href={`/products/${id}`}>
				<div className="relative overflow-hidden rounded-lg group">
					<Image
						alt={name}
						as={NextImage}
						className={clsx('object-contain mx-auto max-h-80 group-hover:scale-105 transition-transform duration-300')}
						classNames={{
							wrapper: clsx('relative w-full bg-contain bg-center bg-no-repeat mx-auto'),
						}}
						fallbackSrc="/images/product-no-image.jpg"
						height={220}
						loading="lazy"
						quality={50}
						sizes='100vw'
						src={image}
						width={220}
					/>
				</div>
				<div className="flex flex-col gap-2">
					{price > 0 && <span className="text-xl font-semibold self-start text-foreground">{`${price} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}`}</span>}
					{name && (
						<p className="flex flex-col text-foreground/90 text-xs sm:text-sm" title={name}>
							{brand && <span className="text-xs text-gray-500 font-light">{brand}</span>}
							<span className="line-clamp-2">{name}</span>
						</p>
					)}
					<span className="text-gray-500 font-light text-xs truncate w-full">
						{Number(totalStock()) > 0 ? `В наличии (${totalStock()})` : null}
					</span>
				</div>
			</CardBody>
			{((item.colors?.length > 0 && item.items?.length > 0) || item.sizes?.length > 0) && (
				<CardFooter className="text-tiny flex-col items-start gap-2 border-t p-4 pt-2">
					{(item.colors?.length > 0 && item.items?.length > 0) && <ProductColors list={item.items} />}
					{item.sizes?.length > 0 && <ProductSizes list={item.sizes} />}
				</CardFooter>
			)}
			<div className="absolute top-2 right-2 z-10">
				<FavoriteButton
					productCategory={category}
					productImage={image}
					productId={id}
					productName={name}
					productPrice={price}
					size="sm"
				/>
			</div>
		</Card>
	);
};

export default ProductThumb;
