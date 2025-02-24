import { Button } from '@heroui/button';
import Link from 'next/link';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from "@/components/layout/Section";
import { SectionProps } from "@/types";
import clsx from "clsx";
import { FAQList } from './faqList';

export const FAQSection = ({ className }: SectionProps) => {
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
			<FAQsFooter />
		</Section>
	);
};

export const FAQsFooter = () => (
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