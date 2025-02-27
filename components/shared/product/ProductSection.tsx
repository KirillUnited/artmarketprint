import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from "@/components/layout/Section";
import { getProductsByLimit } from "@/lib/actions/product.actions";
import ProductList from "./ProductList";

export const ProductSectionHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
    <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>
            <SectionSubtitle>{subtitle}</SectionSubtitle>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
        </SectionHeading>

        <SectionButton label="Все товары" href={'/catalog'} className='hidden lg:flex' />
    </div>
);

export const ProductSection = async () => {
    const data = await getProductsByLimit(4);

    if (!data || data.length === 0) {
        console.warn("Нет данных о продуктах");
        return null;
    }

    return (
        <Section className="relative" id="products" innerClassname="md:pt-0">
            <ProductSectionHeading
                title={'Популярные товары'}
                subtitle={'Каталог'}
                description={'Мы предлагаем широкий выбор продукции для нанесения печати: одежда, аксессуары, сувениры и многое другое'}
            />

            <ProductList jsonData={data} />

            <SectionButton label="Все товары" href={'/catalog'} className='lg:hidden flex' />
        </Section>
    );
};