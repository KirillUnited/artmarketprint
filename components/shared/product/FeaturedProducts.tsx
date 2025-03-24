import ProductList from './ProductList';

import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { getProductsByLimit } from '@/lib/actions/product.actions';

export const ProductSectionHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
    <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>
            <SectionSubtitle>{subtitle}</SectionSubtitle>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
        </SectionHeading>
    </div>
);

export const FeaturedProducts = async () => {
    const data = await getProductsByLimit(5);

    if (!data || data.length === 0) {
        console.warn('Нет данных о продуктах');

        return null;
    }

    return (
        <Section className="relative" id="products" innerClassname="md:pt-0">
            <ProductSectionHeading
                description={'Ознакомьтесь с хитами продаж и новинками, которые выбирают наши покупатели.'}
                subtitle={'Каталог'}
                title={'Популярные товары'}
            />

            <ProductList items={data} />

            <SectionButton className="self-start" href={'/products'} label="Все товары"/>
        </Section>
    );
};