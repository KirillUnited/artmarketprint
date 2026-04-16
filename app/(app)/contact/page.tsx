import React from 'react';
import { Metadata } from 'next';
import { Card } from '@heroui/card';

import ContactUs, { ContactUsHeading } from '@/components/shared/ContactUs';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import Section from '@/components/layout/Section';
import { Socials } from '@/components/shared/socials';
import ContactsList from '@/components/shared/ContactsList';
import { OrderForm } from '@/components/ui/form';

export async function generateMetadata(): Promise<Metadata> {
	const url = 'https://artmarketprint.by/contact';

	return {
		title: 'Контакты - ArtMarketPrint',
		description: 'Свяжитесь с нами любым удобным способом. Адрес, телефон, email и социальные сети ArtMarketPrint.',
		alternates: {
			canonical: url,
			languages: {
				'ru-BY': url,
				'ru-RU': 'https://artmarketprint.ru/contact/',
				'x-default': url,
			},
		},
		openGraph: {
			title: 'Контакты - ArtMarketPrint',
			description: 'Свяжитесь с нами любым удобным способом. Адрес, телефон, email и социальные сети ArtMarketPrint.',
			url: url,
		},
	};
}

export default async function ContactPage() {
	const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
	const contacts = siteSettings?.siteContactInfo || {};
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

	return (
		<Section>
			<div>
				<h1 className="text-3xl md:text-4xl font-bold">Контактная информация</h1>
				<p className="text-lg text-foreground-500 mt-2">
					Свяжитесь с нами любым удобным способом
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
				{/* Contact Information Section */}
				<div className="flex flex-col gap-8">
					<ContactsList className="" items={contacts} />
					<div className='flex flex-col gap-2'>
						<p className="font-light">Социальные сети</p>
						<Socials items={socials} />
					</div>
					<p className='text-balance'>Все права защищены. УНП 193816889. Инспекция МНС по Фрунзенскому району г. Минска № 2</p>
				</div>

				{/* Contact Form Section */}
				<div>
					<Card className="p-6 sticky top-6">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<h2 className="text-2xl md:text-3xl leading-[120%] font-bold">
									Отправить сообщение
								</h2>
								<p>Заполните форму и мы свяжемся с Вами в ближайшее время</p>
							</div>
							<OrderForm className="w-full" />
						</div>
					</Card>
				</div>
			</div>

			{/* Map Section */}
			{siteSettings?.siteContactInfo?.address[0]?.mapEmbed && (
				<section className="mt-12 md:mt-16">
					<h2 className="text-2xl font-bold mb-4">Наше местоположение</h2>
					<div
						dangerouslySetInnerHTML={{ __html: siteSettings.siteContactInfo.address[0].mapEmbed }}
						className="w-full rounded-medium overflow-hidden"
					/>
				</section>
			)}
		</Section>
	);
}