"use client";

import { useEffect, useState } from "react";
import { fetchXML } from "@/lib/actions/product.actions";
import { XMLParser } from "fast-xml-parser";
import BrandCard from "@/components/ui/BrandCard";
import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from "@/components/layout/Section";
import { Spinner } from "@heroui/spinner";

export default function ProductList() {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLoadXML();
  }, []);

  const handleLoadXML = async () => {
    setLoading(true);
    try {
      const data = await fetchXML();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        trimValues: true,
        cdataPropName: "__cdata", // Сохраняем CDATA отдельно
        allowBooleanAttributes: true,
        processEntities: true, // Автоматически заменяет HTML-сущности (&lt; &gt;) 
      })

      const json = parser.parse(data);
      setJsonData(json.data.item);
      console.log(json.data.item);
    } catch (error) {
      console.error("Ошибка при загрузке XML:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Button
        onPress={handleLoadXML}
        disabled={loading}
        isLoading={loading}
      >
        {loading ? "Загрузка..." : "Загрузить JSON потоками"}
      </Button> */}

      {loading && <Spinner className="mx-auto"/>}
      {jsonData.length > 0 && (
        <div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
          {
            jsonData.map((item: any, index) => (
              <BrandCard
                key={index}
                title={item.product.__cdata}
                description={item.general_description.__cdata}
                image={item.images_urls}
                href={item.url}
                price={item.price}
                variant="product"
              />
            ))
          }
        </div>
      )}

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

    <SectionButton label="Все товары" href={'/'} className='hidden lg:flex' />
  </div>
);

export const ProductSection = () => {
  return (
    <Section className="relative" id="products" innerClassname="md:pt-0">
      <ProductSectionHeading
        title={'Наши товары'}
        subtitle={'Популярные товары'}
        description={'Ознакомьтесь с нашими популярными товарами'}
      />

      <ProductList />

      <SectionButton label="Все товары" href={'/'} className='lg:hidden flex' />
    </Section>
  );
};


