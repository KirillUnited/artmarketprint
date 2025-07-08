import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import NextImage from 'next/image';
import clsx from 'clsx';
import { Image } from '@heroui/image';

import { ProductColors } from './ProductColors';
import { ProductSizes } from './ProductSizes';

import { ProductData } from '@/components/shared/product/product.types';
import {getTotalStock} from '@/components/shared/product/lib';

interface ProductThumbProps extends React.HTMLAttributes<HTMLDivElement> {
    item: ProductData;
}

/**
 * Renders a product thumbnail card with an image, title, description, and price.
 * 
 * @returns {JSX.Element} The JSX element representing the product thumbnail card.
 */
const ProductThumb: FC<ProductThumbProps> = ({ item, ...props }) => {
    const id = item.id || item._id || '';
    const price = item.price || 0;
    const name = item.name || '';
    const image = item?.image || '/images/product-no-image.jpg';
    const totalStock = getTotalStock(item.items);
    const brand = item.brand || '';

    return (
        <Card
            as={Link} className={clsx(
                'h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow',
                props.className
            )}
            href={`/products/${id}`}
            radius="sm"
        >
            <CardBody className='items-stretch gap-4'>
                <Image
                    alt={name}
                    as={NextImage}
                    className={clsx(
                        'object-contain aspect-square w-full mx-auto max-w-56 max-h-80'
                        )}
                    classNames={{
                        wrapper: clsx('relative w-full bg-contain bg-center bg-no-repeat mx-auto')
                    }}
                    height={220}
                    loading="lazy"
                    quality={50}
                    src={image}
                    width={220}
                />
                <div className='flex flex-col gap-2'>
                    <span className="text-xl font-semibold self-start text-foreground">{`${price} Br`}</span>
                    <p className="flex flex-col text-foreground/90 text-xs sm:text-sm" title={name}>
                        <span className='text-xs'>{brand}</span>
                        <span className='line-clamp-2'>{name}</span>
                    </p>
                    <span className="text-gray-500 font-light text-xs truncate w-full">{Number(totalStock()) > 0 ? `В наличии (${totalStock()})` : <span className="text-red-500">Нет в наличии</span>}</span>
                </div>
            </CardBody>
            {
                (item.colors?.length > 0 || item.sizes?.length > 0)
                &&
                <CardFooter className='text-tiny flex-col items-start gap-2 border-t'>
                    {
                        item.colors?.length > 0 && (
                            <ProductColors list={item.items} />
                        )
                    }
                    {
                        item.sizes?.length > 0 && (
                            <ProductSizes list={item.sizes} />
                        )
                    }
                </CardFooter>
            }
        </Card>
    );
};

export default ProductThumb;
