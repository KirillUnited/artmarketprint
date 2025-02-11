'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import Link from 'next/link';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from "@/components/layout/Section";
import { SectionProps } from "@/types";
import clsx from "clsx";

export const FAQ = ({ className }: SectionProps) => {
	return (
		<Section className={clsx(className)}>
			<SectionHeading className='max-w-[760px] self-center text-center'>
				<SectionSubtitle>- Вопрос / ответ -</SectionSubtitle>
				<SectionTitle>Часто задаваемые вопросы</SectionTitle>
				<SectionDescription>
					Здесь вы найдете ответы на самые распространенные вопросы о наших услугах и процессе работы
				</SectionDescription>
			</SectionHeading>
			<div className='self-center w-full max-w-3xl'>
				<FAQList />
			</div>
			<FAQFooter />
		</Section>
	);
};

export const FAQList = () => (
	<Accordion className="gap-4" itemClasses={{ base: 'rounded-small' }} variant="splitted">
		<AccordionItem key="1" aria-label="Accordion 1" className="bg-background shadow-small" classNames={{ heading: 'font-bold' }} title="Как сделать заказ?">
			Чтобы сделать заказ, вам нужно выбрать нужную услугу на нашем сайте. После этого заполните форму заказа, указав все необходимые детали. Мы свяжемся с вами для подтверждения и уточнения
			деталей.
		</AccordionItem>
		<AccordionItem key="2" aria-label="Accordion 2" className="bg-background shadow-small" classNames={{ heading: 'font-bold' }} title="Какова стоимость услуг?">
			Стоимость услуг зависит от выбранного типа печати и объема заказа. Мы предлагаем конкурентоспособные цены и различные акции. Для получения точной информации, пожалуйста, свяжитесь с нами.
		</AccordionItem>
		<AccordionItem key="3" aria-label="Accordion 3" className="bg-background shadow-small" classNames={{ heading: 'font-bold' }} title="Какой срок выполнения?">
			Срок выполнения заказа зависит от сложности и объема работы. Обычно мы стараемся завершить заказы в кратчайшие сроки. Вы получите информацию о сроках при подтверждении заказа.
		</AccordionItem>
	</Accordion>
);
export const FAQFooter = () => (
	<div className="flex flex-col self-center items-center w-full max-w-[760px] text-center gap-6">
		<div className="flex flex-col gap-4">
			<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">Остались вопросы?</h3>
			<p className="leading-normal font-normal text-foreground/70 text-balance">Не стесняйтесь обращаться к нам за дополнительной информацией.</p>
		</div>
		<Button as={Link} href={'/#contacts'} className="bg-brand-gradient text-fill-transparent font-semibold border-1" color="secondary" radius="sm" size="md" variant="bordered">
			КОНСУЛЬТАЦИЯ
		</Button>
	</div>
);