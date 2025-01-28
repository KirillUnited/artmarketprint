'use client';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';

export const FAQ = () => {
	const defaultContent =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

	return (
		<section>
			<div className="py-10 md:py-20 flex flex-col gap-10">
				<div className="container">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div className="flex flex-col gap-4 max-w-[652px]">
							<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">Часто задаваемые вопросы</h2>
							<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
								Здесь вы найдете ответы на самые распространенные вопросы о наших услугах и процессе работы
							</p>
						</div>
					</div>
				</div>
				<div className="container">
					<Accordion variant='splitted' className='gap-4'>
						<AccordionItem key="1" aria-label="Accordion 1" title="Как сделать заказ?" className='bg-background' classNames={{ heading: 'font-bold' }}>
							Чтобы сделать заказ, вам нужно выбрать нужную услугу на нашем сайте. После этого заполните форму заказа, указав все необходимые детали. Мы свяжемся с вами для подтверждения и уточнения деталей.
						</AccordionItem>
						<AccordionItem key="2" aria-label="Accordion 2" title="Какова стоимость услуг?" className='bg-background' classNames={{ heading: 'font-bold' }}>
							Стоимость услуг зависит от выбранного типа печати и объема заказа. Мы предлагаем конкурентоспособные цены и различные акции. Для получения точной информации, пожалуйста, свяжитесь с нами.
						</AccordionItem>
						<AccordionItem key="3" aria-label="Accordion 3" title="Какой срок выполнения?" className='bg-background' classNames={{ heading: 'font-bold' }}>
							Срок выполнения заказа зависит от сложности и объема работы. Обычно мы стараемся завершить заказы в кратчайшие сроки. Вы получите информацию о сроках при подтверждении заказа.
						</AccordionItem>
					</Accordion>
				</div>
				<div className="container">
					<div className="flex flex-col items-start gap-6">
						<div className="flex flex-col gap-4 max-w-[652px]">
							<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">Остались вопросы?</h3>
							<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
								Не стесняйтесь обращаться к нам за дополнительной информацией.
							</p>
						</div>
						<Button className='bg-brand-gradient text-fill-transparent font-semibold' color='secondary' radius='sm' size='lg' variant='ghost'>КОНСУЛЬТАЦИЯ</Button>
					</div>
				</div>
			</div>

		</section>
	);
};
