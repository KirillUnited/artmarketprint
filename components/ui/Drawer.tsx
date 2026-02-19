'use client';
import {Button} from '@heroui/button';
import {Drawer as BaseDrawer, DrawerBody, DrawerContent, DrawerHeader} from '@heroui/drawer';
import {useDisclosure} from '@heroui/modal';
import {BookOpenIcon, BriefcaseIcon, FolderIcon, HomeIcon, MenuIcon, NewspaperIcon, PhoneIcon, WrenchIcon} from 'lucide-react';
import React from 'react';
import {NavbarItem} from '@heroui/navbar';
import {Link} from '@heroui/link';
import {SanityDocument} from 'next-sanity';

import {Socials} from '@/components/shared/socials';

import {HeroModalOffer} from './BrandModalOffer';
import BrandLogo from './BrandLogo';

const menuIcons = {
	Главная: <HomeIcon aria-hidden="true" className="text-primary" />,
	Услуги: <WrenchIcon aria-hidden="true" className="text-primary" />,
	Каталог: <BookOpenIcon aria-hidden="true" className="text-primary" />,
	Категории: <FolderIcon aria-hidden="true" className="text-primary" />,
	Проекты: <BriefcaseIcon aria-hidden="true" className="text-primary" />,
	Контакты: <PhoneIcon aria-hidden="true" className="text-primary" />,
	Блог: <NewspaperIcon aria-hidden={'true'} className={'text-primary'} />,
};

export default function Drawer({navigation, className, siteSettings, children}: {navigation: any; className?: string; siteSettings: SanityDocument; children?: React.ReactNode}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const phones = siteSettings?.siteContactInfo?.phones ?? [];
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

	return (
		<>
			<Button isIconOnly aria-label="Open menu" className={className} variant="light" onPress={onOpen}>
				<MenuIcon aria-hidden="true" />
			</Button>

			<BaseDrawer
				backdrop="blur"
				isOpen={isOpen}
				motionProps={{
					variants: {
						enter: {
							opacity: 1,
							x: 0,
						},
						exit: {
							x: 100,
							opacity: 0,
						},
					},
				}}
				radius="none"
				size="xs"
				onOpenChange={onOpenChange}
			>
				<DrawerContent>
					{(onClose) => (
						<>
							<DrawerHeader className="flex flex-col items-start gap-1">
								<BrandLogo alt={'ArtMarketPrint'} />
							</DrawerHeader>
							<DrawerBody className="gap-6">
								<ul className="flex flex-col gap-4">
									{navigation?.map((navItem: any) => (
										<NavbarItem key={navItem.title}>
											<Link
												aria-current="page"
												className="leading-normal font-semibold hover:underline hover:text-primary transition gap-2"
												color={'foreground'}
												href={navItem.url}
												size="sm"
												onPress={onClose}
											>
												{menuIcons[navItem.title as keyof typeof menuIcons]}
												{navItem.title}
											</Link>
										</NavbarItem>
									))}
								</ul>
								<div className="grow flex flex-col">
									<HeroModalOffer id="Консультация" />
								</div>
								<div className="flex flex-col gap-2">
									{phones?.map((item: {link: string; number: string}) => (
										<Link key={item.link} className="font-bold text-left flex items-center gap-2" href={`tel:${item.link}` || '#'}>
											<PhoneIcon size={20} />
											{item.number}
										</Link>
									))}

									<div className="mt-6">
										<Socials items={socials} />
									</div>
								</div>
							</DrawerBody>
						</>
					)}
				</DrawerContent>
			</BaseDrawer>
		</>
	);
}
