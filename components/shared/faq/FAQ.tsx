import { Button } from '@heroui/button';
import Link from 'next/link';
import clsx from 'clsx';
import { FAQItem, FAQList } from './faqList';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import {JSX} from "react";

/**
 * A function that renders a FAQ section with a heading, list of FAQs, and a call-to-action button.
 * @param {{ isActive: boolean, faqs: FAQItem[], title?: string, subtitle?: string, description?: string }} props
 * @returns {JSX.Element | null} A JSX element or null if the component is not active or required props are missing.
 */
export const FAQSection = ({
	className,
	isActive,
	faqs,
	title,
	subtitle,
	description,
	faqsFooter,
}: {
	className?: string;
	isActive: boolean;
	faqs: FAQItem[];
	title?: string;
	subtitle?: string;
	description?: string;
	faqsFooter?: { title: string; description: string };
}): JSX.Element | null => {
	if (!isActive) return null;
	if (!Array.isArray(faqs) || faqs.length === 0) {
		return null;
	}
	return (
		<Section className={clsx(className)}>
			<SectionHeading className='max-w-[760px] self-center text-center'>
				{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
				{title && <SectionTitle>{title}</SectionTitle>}
				{description && <SectionDescription>
					{description}
				</SectionDescription>}
			</SectionHeading>
			<div className='self-center w-full max-w-3xl'>
				<FAQList items={faqs} />
			</div>
			{faqsFooter && <FAQsFooter title={faqsFooter.title} description={faqsFooter.description} />}
		</Section>
	);
};

/**
 * A function that renders a footer section with a heading, description, and a call-to-action button.
 * @param {{ title: string, description: string }} props - The props object with required properties.
 * @returns {JSX.Element} A JSX element that represents the footer section.
 */
export const FAQsFooter = ({
	title,
	description,
}: {
	title: string;
	description: string;
}): JSX.Element => (
	<div className="flex flex-col self-center items-center w-full max-w-[760px] text-center gap-6">
		<div className="flex flex-col gap-4">
			<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">{title}</h3>
			<p className="leading-normal font-normal text-foreground/70 text-balance">{description}</p>
		</div>
		<Button as={Link} className="bg-brand-gradient text-fill-transparent font-semibold border-1" color="secondary" href={'/#contacts'} radius="sm" size="md" variant="bordered">
			КОНСУЛЬТАЦИЯ
		</Button>
	</div>
);
