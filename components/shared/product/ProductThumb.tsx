import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';
import { Button } from '@heroui/button';
import { getPrice } from '@/lib/getPrice';

export default function ProductThumb({ item }: any) {
    return (
        <Card className="h-full group relative max-w-full shadow-sm" radius="sm" >
            <CardBody as={Link} href={`/products/${item?.id["#text"]}`} className='items-stretch'>
                <Image removeWrapper alt={item.altText} className="object-cover aspect-square mx-auto" radius="sm" src={item.images_urls?.split(",")[0]} width={220} />
                <span className="text-xl md:text-2xl text-primary font-semibold self-start">{`${getPrice(item.price, 1.1)} BYN`}</span>
                <h3 className="font-bold text-gray-900 line-clamp-2">{item.product?.__cdata}</h3>
                <p className="text-gray-600 line-clamp-2 text-xs">{item.general_description?.__cdata}</p>
            </CardBody>
            <CardFooter>
                <Button as={Link} target='_blank' href={`/products/${item?.id["#text"]}`} size="md" color='secondary' radius='sm'>Подробнее</Button>
            </CardFooter>
        </Card>
    )
}
