import {BrandCard} from '@/components/ui/card';
import { ProductData } from './product.types';

export default function ProductList({ items }: { items: ProductData[]}) {
  return (
    <>
      {(Array.isArray(items) && items.length > 0 )? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {
            items.map((item, index: number) => (
              <BrandCard
                key={item.id}
                buttonLabel="заказать"
                description={item.description}
                href={`/products/${item.id}`}
                image={item.image}
                imageFit="contain"
                price={`${item?.price} BYN`}
                title={item.name}
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
