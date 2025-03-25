import Image from 'next/image';
import {Button} from '@heroui/button';
import Link from 'next/link';
import {ArrowUpRightIcon} from 'lucide-react';

import AboutImage from '../../public/images/about.jpg';

import BrandButton from '@/components/ui/BrandButton';
import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
export default function About() {
	return (
		<Section className="section relative overflow-hidden bg-[#F1F4FA]">
			<div className="grid md:grid-cols-2 items-center gap-8">
				<Image alt={'ArtMarketPrint'} className="max-h-max h-full object-cover flex-1 w-full rounded-small" height={640} placeholder="blur" quality={100} src={AboutImage} width={640} />
				<div className="flex flex-col gap-8 md:gap-16">
					<SectionHeading className="max-w-full">
						<SectionSubtitle>О нас</SectionSubtitle>
						<SectionTitle>
							<span className="font-extrabold bg-brand-gradient text-fill-transparent">Art Market Print</span>
							<br />
							Печать в Минске
						</SectionTitle>
						<SectionDescription>
							Наши услуги обеспечивают высокое качество печати и гравировки, что позволяет вам выделяться на фоне конкурентов. Мы используем современные технологии, чтобы гарантировать
							долговечность и яркость ваших изделий.
						</SectionDescription>
					</SectionHeading>
					<div className="flex flex-col md:flex-row gap-2 md:gap-4">
						<BrandButton as={Link} className='min-w-40' href={'/services'}
						size='md'
						state="primary"
						>
							УСЛУГИ
						</BrandButton>

						<Button
							as={Link}
							className="bg-brand-gradient text-fill-transparent font-semibold group"
							color="secondary"
							href={'/catalog'}
							radius="sm"
							size="md"
							target="_blank"
							variant="bordered"
						>
							<span className="leading-none">КАТАЛОГ</span>
							<ArrowUpRightIcon className="text-secondary group-hover:translate-x-1 transition-transform" size={18} />
						</Button>
					</div>
				</div>
			</div>
		</Section>
	);
}
