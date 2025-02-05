'use client';
import {Accordion, AccordionItem} from '@heroui/accordion';
import {Button} from '@heroui/button';
import Link from 'next/link';
import Section from "@/components/layout/Section";
import {SectionProps} from "@/types";
import clsx from "clsx";

export const FAQ = ({className}: SectionProps) => {
	return (
		<Section className={clsx(className)}>
			<div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
				<div className="flex flex-col gap-4">
					<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">Часто задаваемые вопросы</h2>
					<p className="text-base md:text-lg leading-normal font-normal text-foreground/70 text-balance">
						Здесь вы найдете ответы на самые распространенные вопросы о наших услугах и процессе работы
					</p>
				</div>
			</div>
			<FAQList />
			<FAQFooter />
		</Section>
	);
};

export const FAQList = () => (
	<Accordion className="gap-4" itemClasses={{base: 'rounded-md'}} variant="splitted">
		<AccordionItem key="1" aria-label="Accordion 1" className="bg-background shadow-small" classNames={{heading: 'font-bold'}} title="Как сделать заказ?">
			Чтобы сделать заказ, вам нужно выбрать нужную услугу на нашем сайте. После этого заполните форму заказа, указав все необходимые детали. Мы свяжемся с вами для подтверждения и уточнения
			деталей.
		</AccordionItem>
		<AccordionItem key="2" aria-label="Accordion 2" className="bg-background shadow-small" classNames={{heading: 'font-bold'}} title="Какова стоимость услуг?">
			Стоимость услуг зависит от выбранного типа печати и объема заказа. Мы предлагаем конкурентоспособные цены и различные акции. Для получения точной информации, пожалуйста, свяжитесь с нами.
		</AccordionItem>
		<AccordionItem key="3" aria-label="Accordion 3" className="bg-background shadow-small" classNames={{heading: 'font-bold'}} title="Какой срок выполнения?">
			Срок выполнения заказа зависит от сложности и объема работы. Обычно мы стараемся завершить заказы в кратчайшие сроки. Вы получите информацию о сроках при подтверждении заказа.
		</AccordionItem>
	</Accordion>
);
export const FAQFooter = () => (
	<div className="flex flex-col items-start gap-6">
		<div className="flex flex-col gap-4 max-w-[652px]">
			<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">Остались вопросы?</h3>
			<p className="text-base md:text-lg leading-normal font-normal text-foreground/70 text-balance">Не стесняйтесь обращаться к нам за дополнительной информацией.</p>
		</div>
		<Button as={Link} href={'/#contacts'} className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="lg" variant="ghost">
			КОНСУЛЬТАЦИЯ
		</Button>
	</div>
);