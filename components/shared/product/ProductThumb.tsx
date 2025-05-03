import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import NextImage from 'next/image';

import { getPrice } from '@/lib/getPrice';
import clsx from 'clsx';
import { ProductData } from '@/components/shared/product/product.types';

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
            <CardBody className='items-stretch'>
                <NextImage alt={name} className="object-contain aspect-square mx-auto mb-4" loading="lazy" src={image} width={220} height={220} quality={50} />
                <span className="text-xl font-semibold self-start text-foreground">{`${price} BYN`}</span>
                <p className="text-gray-900 line-clamp-2 text-xs sm:text-sm">{name}</p>
            </CardBody>
            {
                (item.colors?.length > 0 || item.sizes?.length > 0)
                &&
                <CardFooter className='text-tiny flex-col items-start gap-2 border-t'>
                    {
                        item.colors?.length > 0
                        && <div className='flex flex-col'>
                            <span className='font-semibold'>Цвета:</span>
                            <ul className='flex gap-2 flex-wrap'>
                                {
                                    item.colors.map((color: any) => color).join(', ')
                                    // item.items?.map((item: any)=>{
                                    //     return (
                                    //         <NextImage
                                    //             alt={item.product[0]._}
                                    //             key={item._id}
                                    //             src={item.images_urls[0]?.split(',')[0] || item.image} width={36} height={36} 
                                    //             className="object-contain aspect-square"
                                    //             quality={10}
                                    //         />
                                    //     )
                                    // })
                                }
                            </ul>
                        </div>
                    }
                    {
                        item.sizes?.length > 0
                        && <div className='flex flex-col gap-1'>
                            <span className='font-semibold'>Размеры:</span>
                            <ul className='flex flex-wrap gap-y-2'>
                                {item.sizes.map((size: any) => <li key={size} className='border-l border-gray-950 px-2 last:border-r'>{size}</li>)}
                            </ul>
                        </div>
                    }
                </CardFooter>
            }
        </Card>
    );
};

export default ProductThumb;
