import React from 'react';
import clsx from 'clsx';
import { Card } from '@heroui/card';

import {Socials} from '@/components/shared/socials';
import ContactsList from './ContactsList';

import { SectionProps } from '@/types';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';

interface ContactUsProps extends SectionProps { }

const ContactUs: React.FC<ContactUsProps> = async ({ className, ...props }) => {
	const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
	const contacts = siteSettings?.siteContactInfo || {};
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

	return (
		<>
			<Section className={clsx('bg-[#F1F4FA]', className)} {...props}>
				<div className="grid md:grid-cols-2 items-start gap-x-20 gap-y-10">
					<div className='flex flex-col gap-10'>
						<ContactUsHeading
							description="Если у вас есть вопросы, предложения или хотите связаться с нами, используйте любой удобный способ:"
							subtitle="Свяжитесь с нами"
							title="Мы всегда рады вам помочь!"
						/>
						<div className="flex flex-wrap gap-10 justify-between">
							<div className="flex flex-col gap-6">
								<ContactsList items={contacts} className="" />
								<Socials items={socials} />
								<p>Ждем вас в любое удобное время!</p>
							</div>
						</div>
					</div>

					<Card className={clsx(
						'flex flex-col gap-6',
						'p-4 bg-background sticky top-16'
					)} radius='sm' shadow='sm'>
						<div className='flex flex-col gap-2'>
							<h3 className="text-2xl md:text-3xl leading-[120%] font-bold">
								Оставить заявку
							</h3>
							<p>Оставьте заявку и мы свяжемся с Вами в ближайшее время</p>
						</div>
						<OrderForm className="w-full" />
					</Card>
				</div>
			</Section>
			<MapFrame widget={siteSettings?.siteContactInfo?.address[0].mapEmbed} />
		</>
	);
};

export default ContactUs;

export const ContactUsHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>{subtitle}</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>
	</div>
);

export const MapFrame = ({ widget = '' }: { widget: string }) => (
	<section className="w-full" dangerouslySetInnerHTML={{ __html: widget }} />
);
