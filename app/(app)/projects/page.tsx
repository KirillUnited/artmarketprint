import Image from 'next/image';

import { siteConfig } from '@/config/site';
import ContactUs from '@/components/shared/ContactUs';
import { getSanityDocuments } from '@/lib/getData';
import { ProjectList } from '@/components/shared/Projects';
import { PROJECTS_QUERY } from '@/lib/queries';
import Section from '@/components/layout/Section';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';

export default async function ProjectsPage() {
	const data = await getSanityDocuments(PROJECTS_QUERY);
	const { title = '', subtitle = '', description = '', projects = [] } = data?.[0] || {};

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				<Image priority alt={`${siteConfig?.seo?.title}`} className="absolute inset-0 object-cover w-full h-full" height={1080} src="/images/service-2.jpg" width={1920} />
				<div className="container flex flex-col gap-8 max-w-2xl relative z-10">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold text-background sm:text-5xl">{title}</h1>
						<p className="mt-4 text-xl text-white">{description}</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="mt-10 mb-6">
						<BaseBreadcrumb section='Проекты'/>
					</div>
				</div>
			</section>
			<Section innerClassname='pt-6 md:pt-6'>
				<ProjectList projectList={projects} bentoGrid={false} />
			</Section>
			<ContactUs />
		</>
	);
}