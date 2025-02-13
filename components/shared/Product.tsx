// "use client";

// import { useEffect, useState } from "react";
// import { getProductsByLimit } from "@/lib/actions/product.actions";
import BrandCard from "@/components/ui/BrandCard";
import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from "@/components/layout/Section";
import { Spinner } from "@heroui/spinner";
import { getProductsByLimit } from "@/lib/actions/product.actions";

export default function ProductList({jsonData}: any) {
  // const [jsonData, setJsonData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   handleLoadData();
  // }, []);

  // const handleLoadData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch('/api/products');
  //     const data = await res.json();

  //     setJsonData(data);
  //   } catch (error) {
  //     console.error("Ошибка при загрузке XML:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {/* {loading && <Spinner className="mx-auto" />} */}
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
export const ProductSectionHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <SectionHeading>
      <SectionSubtitle>- {subtitle} -</SectionSubtitle>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
    </SectionHeading>

    <SectionButton label="Все товары" href={'/catalog'} className='hidden lg:flex' />
  </div>
);

export const ProductSection = async () => {
const data = await getProductsByLimit(4);

  return (
    <Section className="relative" id="products" innerClassname="md:pt-0">
      <ProductSectionHeading
        title={'Популярные товары'}
        subtitle={'Каталог'}
        description={'Ознакомьтесь с нашими популярными товарами'}
      />

      <ProductList jsonData={data} />

      <SectionButton label="Все товары" href={'/catalog'} className='lg:hidden flex' />
    </Section>
  );
};


