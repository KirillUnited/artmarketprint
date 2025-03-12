import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';

import { getPrice } from '@/lib/getPrice';

export default function ProductThumb({ item }: any) {
    return (
        <Card className="h-full group relative max-w-full shadow-small hover:shadow-large transition-shadow" radius="sm" >
            <CardBody as={Link} className='items-stretch' href={`/products/${item?.id['#text']}`}>
                <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(',')[0]} width={220} />
                <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${getPrice(item.price, 1.1)} BYN`}</span>
                <h3 className="font-bold text-gray-900 line-clamp-2">{item.product?.__cdata}</h3>
                <p className="text-gray-600 line-clamp-2 text-xs">{item.general_description?.__cdata}</p>
            </CardBody>
            <CardFooter>
                <Button as={Link} color='secondary' href={`/products/${item?.id['#text']}`} radius='sm' size="md" target='_blank'>Подробнее</Button>
            </CardFooter>
        </Card>
    )
}
