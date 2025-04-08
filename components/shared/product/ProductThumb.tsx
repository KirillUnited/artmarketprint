import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import NextImage from 'next/image';

import { getPrice } from '@/lib/getPrice';
import clsx from 'clsx';
import { ProductData } from '@/types/product.types';

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
            className={clsx(
                "h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow",
                props.className
            )}
            radius="sm"
        >
            <CardBody as={Link} className='items-stretch' href={`/products/${id}`}>
                <NextImage alt={name} className="object-contain aspect-square mx-auto mb-4" loading="lazy" src={image} width={220} height={220} quality={50} />
                <span className="text-xl font-semibold self-start text-foreground">{`${price} BYN`}</span>
                <h3 className="text-gray-900 line-clamp-2 text-xs sm:text-sm">{name}</h3>
            </CardBody>
            {/* <CardFooter className='hidden sm:flex'>
                <Button as={Link} color='secondary' href={`/products/${id}`} radius='sm' size="md" target='_blank'>Подробнее</Button>
            </CardFooter> */}
        </Card>
    );
};

export default ProductThumb;
