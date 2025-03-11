import {BrandCard} from '@/components/ui/card';
import { getPrice } from '@/lib/getPrice';

export interface ProductListProps {
  items: Array<{
    id: {
      '#text': string
    }
    product: {
      __cdata: string
    }
    general_description: {
      __cdata: string
    }
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
                key={item.id['#text']}
                buttonLabel="предзаказ"
                description={item.general_description.__cdata}
                href={`/products/${item.id['#text']}`}
                image={item.images_urls.split(',')[0]}
                imageFit="contain"
                price={`${getPrice(item?.price, 1.1)} BYN`}
                title={item.product.__cdata}
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
