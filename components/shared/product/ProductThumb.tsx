import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import NextImage from 'next/image';

import { getPrice } from '@/lib/getPrice';
import clsx from 'clsx';
import { ProductData } from '@/components/shared/product/product.types';
import { ProductColors } from './ProductColors';
import { ProductSizes } from './ProductSizes';
import { Image } from '@heroui/image';

interface ProductThumbProps extends React.HTMLAttributes<HTMLDivElement> {
    item: ProductData;
}

/**
 * Renders a product thumbnail card with an image, title, description, and price.
 * 
 * @returns {JSX.Element} The JSX element representing the product thumbnail card.
 */
const ProductThumb: FC<ProductThumbProps> = ({ item, ...props }) => {
    const id = item._id;
    const price = getPrice(item.price, 1.1);
    const name = item.name;
    const image = item.image;

    return (
        <Card
            as={Link} href={`/products/${id}`}
            className={clsx(
                "h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow",
                props.className
            )}
            radius="sm"
        >
            <CardBody className='items-stretch gap-4'>
                <Image 
                    as={NextImage} 
                    alt={name} 
                    fallbackSrc={'/images/product-no-image.jpg'}
                    className="object-contain aspect-square mx-auto" 
                    classNames={{ wrapper: 'bg-cover' }}
                    loading="lazy" 
                    src={image} 
                    width={220} 
                    height={220} 
                    quality={50}
                />
                <div>
                    <span className="text-xl font-semibold self-start text-foreground">{`${price} BYN`}</span>
                    <p className="text-gray-900 line-clamp-2 text-xs sm:text-sm">{name}</p>
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
                        item.sizes?.length > 0
                        && (
                            <ProductSizes list={item.sizes} />
                        )
                    }
                </CardFooter>
            }
        </Card>
    );
};

export default ProductThumb;
