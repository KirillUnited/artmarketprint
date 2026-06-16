import Link from 'next/link';


import { Socials } from '@/components/shared/socials';
import ContactsList from '@/components/shared/ContactsList';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import { client } from '@/sanity/client';

import BrandLogo from '../ui/BrandLogo';
import { FooterNavList } from './FooterNavList';

export default async function Footer() {
	const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
	// Fetch navigation data from Sanity
	const navigation = await client.fetch(NAVIGATION_QUERY);
	const contacts = siteSettings?.siteContactInfo || {};
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

	return (
		<footer className="bg-foreground">
			<div className="container">
				<div className="flex md:flex-row flex-col flex-wrap gap-8 md:gap-16 items-start justify-between py-6 md:py-14">
					<div className="flex flex-col gap-8">
						<div className="self-start">
							<BrandLogo alt="ArtMarketPrint" />
						</div>
					</div>
					<div className="flex flex-col gap-4 md:gap-8">
						<div className="flex flex-col gap-4 md:gap-6">
							<p className="font-bold text-white">Навигация</p>

							<FooterNavList links={navigation[0]?.links ?? []} />
						</div>
					</div>
					<div className="flex flex-col gap-4 md:gap-6">

						<p className="font-bold text-white">Контакты</p>
						<ContactsList className="text-[#eeeeee]" items={contacts} />
					</div>
					<div className="flex flex-col gap-4 md:gap-6">
						<div className="flex flex-col gap-4">
							<p className="font-bold text-white">Мы в мессенджерах</p>
							<Socials items={socials.filter((item: any) => item?.platform !== 'instagram')} />
						</div>
						<div className="flex flex-col gap-4">
							<p className="font-medium text-[#eeeeee]">Следите за нами в инстаграм</p>
							<Socials items={socials.filter((item: any) => item?.platform === 'instagram')} />
						</div>
					</div>
				</div>
			</div>

			<div className="container border-solid border-[#eeeeee] border-t py-8">
				<div className="flex flex-wrap gap-8 flex-col md:flex-row md:justify-between items-center">
					{contacts?.footnote && <p className="text-[#eeeeee] text-center order-2 md:order-1">© {new Date().getFullYear()}. {contacts.footnote}</p>}

					<Link className="order-1 md:order-2 text-[#eeeeee] text-left font-medium hover:text-primary transition border-b w-auto" href={'/posts/privacy'}>
						Политика конфиденциальности
					</Link>
				</div>
			</div>
		</footer>
	);
}
