import React from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';

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