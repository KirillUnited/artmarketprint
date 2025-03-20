import Section, { SectionHeading, SectionTitle } from '@/components/layout/Section';
import CartForm from '@/components/ui/form/CartForm';

const CartPage = () => {
    return (
        <Section>
            <SectionHeading>
                <SectionTitle>Корзина</SectionTitle>
            </SectionHeading>

            <div className="bg-gray-50 rounded-small outline -outline-offset-1 outline-1 outline-gray-200">
                <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Оформление заказа</h2>
                    <CartForm />
                </div>
            </div>
        </Section>
    );
};

export default CartPage;