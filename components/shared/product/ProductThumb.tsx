import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';
import NextImage from 'next/image';

import { getPrice } from '@/lib/getPrice';
import clsx from 'clsx';

interface ProductThumbProps extends React.HTMLAttributes<HTMLDivElement> {
    item: {
        id: [{ _: string }];
        product: [{ _: string }];
        images_urls: string[];
        price: number;
        general_description: string[];
    };
}

/**
 * Renders a product thumbnail card with an image, title, description, and price.
 * 
 * @returns {JSX.Element} The JSX element representing the product thumbnail card.
 */
const ProductThumb: FC<ProductThumbProps> = ({ item, ...props }) => {
    return (
        <Card
            className={clsx(
                "h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow",
                props.className
            )}
            radius="sm"
        >
            <CardBody as={Link} className='items-stretch' href={`/products/${item.id[0]['_']}`}>
                <Image as={NextImage} removeWrapper alt={item.product[0]['_']} className="object-contain aspect-square mx-auto" radius="sm" src={item.images_urls[0]?.split(',')[0]} width={220} height={220} quality={50} />
                <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${getPrice(item.price, 1.1)} BYN`}</span>
                <h3 className="font-bold text-gray-900 line-clamp-2">{item.product[0]['_']}</h3>
                <p className="text-gray-600 line-clamp-2 text-xs">{item.general_description[0]}</p>
            </CardBody>
            <CardFooter>
                <Button as={Link} color='secondary' href={`/products/${item.id[0]['_']}`} radius='sm' size="md" target='_blank'>Подробнее</Button>
            </CardFooter>
        </Card>
    );
};

export default ProductThumb;
