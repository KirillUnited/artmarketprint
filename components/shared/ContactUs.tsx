import React from 'react';
import clsx from 'clsx';
import { Card } from '@heroui/card';

import Socials from './Socials';
import ContactsList from './ContactsList';

import { SectionProps } from '@/types';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/site.query';

interface ContactUsProps extends SectionProps { }

const ContactUs: React.FC<ContactUsProps> = async ({ className, ...props }) => {
	const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
	const contacts = siteSettings?.siteContactInfo || {};
    const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

	return (
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

export const MapFrame = () => (
	<section className="w-full" style={{ position: 'relative', overflow: 'hidden' }}>
		<a href="https://yandex.by/navi/org/art_market_print/100202069960/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}>
			Арт Маркет Принт
		</a>
		<a href="https://yandex.by/navi/157/minsk/category/printing_services/184107124/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}>
			Полиграфические услуги в Минске
		</a>
		<a href="https://yandex.by/navi/157/minsk/category/printing_on_t_shirts/179539030136/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 28 }}>
			Печать на ткани в Минске
		</a>
		<iframe
			allowFullScreen
			height={400}
			src="https://yandex.by/map-widget/v1/org/art_market_print/100202069960/?ll=27.508390%2C53.918763&z=17"
			style={{ position: 'relative' }}
			title="ArtMarketPrint"
			width={'100%'}
		/>
	</section>
);
