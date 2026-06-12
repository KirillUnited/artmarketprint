import Link from 'next/link';


import { Socials } from '@/components/shared/socials';
import ContactsList from '@/components/shared/ContactsList';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import { client } from '@/sanity/client';

import BrandLogo from '../ui/BrandLogo';

export default async function Footer() {
	const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
	// Fetch navigation data from Sanity
	const navigation = await client.fetch(NAVIGATION_QUERY);
	const contacts = siteSettings?.siteContactInfo || {};
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];
	console.log(socials);

	return (
		<footer className="bg-foreground">
			<div className="container">
				<div className="flex flex-row flex-wrap gap-16 items-start justify-between py-6 md:py-14">
					<div className="flex flex-col gap-8">
						<div className="self-start">
							<BrandLogo alt="ArtMarketPrint" />
						</div>
					</div>
					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-6">
							<p className="font-bold text-white">Навигация</p>

							<ul className="flex flex-col gap-4">
								{navigation[0]?.links?.map((link: any, index: number) => (
									<li key={index}>
										<Link className="text-[#eeeeee] text-left font-medium self-stretch hover:text-primary transition" href={link.url}>
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="flex flex-col gap-6">

						<p className="font-bold text-white">Контакты</p>
						<ContactsList className="text-[#eeeeee]" items={contacts} />
					</div>
					<div className="flex flex-col gap-6">
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
				<div className="flex gap-8 justify-between">
					{contacts?.footnote && <p className="text-[#eeeeee] text-center">© {new Date().getFullYear()}. {contacts.footnote}</p>}

					<Link className="text-[#eeeeee] text-left font-medium self-stretch hover:text-primary transition border-b" href={'/posts/privacy'}>
						Политика конфиденциальности
					</Link>
				</div>
			</div>
		</footer>
	);
}
