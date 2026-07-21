import { Button } from '@heroui/button';
import Link from 'next/link';
import clsx from 'clsx';
import { JSX } from 'react';

import Section, {
  SectionDescription,
  SectionHeading,
  SectionSubtitle,
  SectionTitle,
} from '@/components/layout/Section';

import { FAQItem, FAQList } from './faqList';
import { SectionEyebrow } from '@/app/(app)/services/components/primitives';

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
      <SectionEyebrow n="14" label="faq" />
      <SectionHeading className="max-w-[760px] self-center text-center">
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        {title && <SectionTitle>{title}</SectionTitle>}
        {description && <SectionDescription>{description}</SectionDescription>}
      </SectionHeading>
      <div className="w-full max-w-3xl self-center">
        <FAQList items={faqs} />
      </div>
      {faqsFooter && <FAQsFooter description={faqsFooter.description} title={faqsFooter.title} />}
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
  <div className="flex w-full max-w-[760px] flex-col items-center gap-6 self-center text-center">
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl leading-[120%] font-bold md:text-3xl">{title}</h3>
      <p className="text-foreground/70 leading-normal font-normal text-balance">{description}</p>
    </div>
    <Link href={'/#contacts'}>
      <Button
        className="bg-brand-gradient text-fill-transparent border font-semibold"
        color="secondary"
        radius="sm"
        size="md"
        variant="bordered"
      >
        КОНСУЛЬТАЦИЯ
      </Button>
    </Link>
  </div>
);
