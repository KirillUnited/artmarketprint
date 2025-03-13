import {BrandCard} from '@/components/ui/card';
import { getPrice } from '@/lib/getPrice';

export interface ProductListProps {
  items: Array<{
    id: {
      '_': string
    }[]
    product: {
      '_': string
    }[]
    general_description: {
      '_': string
    }[]
    images_urls: string
    price: string
  }>
}

export default function ProductList({ items }: ProductListProps) {
  return (
    <>
      {(Array.isArray(items) && items.length > 0 )? (
        <div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
          {
            items.map((item, index: number) => (
              <BrandCard
                key={item.id[0]['_']}
                buttonLabel="предзаказ"
                description={item.general_description[0]['_']}
                href={`/products/${item.id[0]['_']}`}
                image={item.images_urls[0].split(',')[0]}
                imageFit="contain"
                price={`${getPrice(item?.price, 1.1)} BYN`}
                title={item.product[0]['_']}
                variant="product"
              />
            ))
          }
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500">Нет товаров</p>
      )
      }
    </>
  );
}
