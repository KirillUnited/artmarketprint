import {BrandCard} from "@/components/ui/card";

export interface ProductListProps {
  items: Array<{
    id: {
      "#text": string
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
                key={item.id["#text"]}
                title={item.product.__cdata}
                description={item.general_description.__cdata}
                image={item.images_urls.split(",")[0]}
                imageFit="contain"
                href={`/products/${item.id["#text"]}`}
                price={`${item.price} BYN`}
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
