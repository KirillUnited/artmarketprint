'use client';
import React from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { PortableText } from 'next-sanity';

export interface FAQItem {
  title: string;
  body: any; // Adjust this type based on the actual structure of `item.body`
}

export interface FAQListProps {
  items: FAQItem[];
}

/**
 * FAQList component to display a list of FAQs in an accordion format.
 *
 * @param {FAQListProps} props - The properties for the FAQList component.
 * @returns {JSX.Element} The rendered FAQList component.
 */
export const FAQList: React.FC<FAQListProps> = ({ items }) => (
  <Accordion className="gap-4" itemClasses={{ base: 'rounded-small' }} variant="splitted">
    {
      items.map((item, index) => (
        <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} className="bg-background shadow-small" classNames={{ heading: 'font-bold' }} title={item.title}>
          <PortableText value={item.body} />
        </AccordionItem>
      ))
    }
  </Accordion>
);
