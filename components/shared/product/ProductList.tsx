import {BrandCard} from '@/components/ui/card';
import {getPrice, priceTransform} from '@/lib/getPrice';
import { ProductData } from './product.types';
import {Companies} from "@/lib/products/companies";

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
                price={`${getPrice(item?.price, (1 - priceTransform(Companies.ARTE.discount)))} BYN`}
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
