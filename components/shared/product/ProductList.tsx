import {BrandCard} from "@/components/ui/card";

export default function ProductList({ jsonData }: any) {
  return (
    <>
      {jsonData.length > 0 ? (
        <div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
          {
            jsonData.map((item: any, index: number) => (
              <BrandCard
                key={index}
                title={item.product.__cdata}
                description={item.general_description.__cdata}
                image={item.images_urls.split(",")[0]}
                imageFit="contain"
                href={`/catalog`}
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