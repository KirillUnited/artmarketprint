import Image from 'next/image';

import { siteConfig } from '@/config/site';
import ContactUs from '@/components/shared/ContactUs';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { ProjectList } from '@/components/shared/project';
import { NAVIGATION_QUERY, PROJECTS_QUERY } from '@/sanity/lib/queries';
import Section, { SectionSubtitle } from '@/components/layout/Section';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { HOME_PAGE_PROJECTS_QUERY } from '@/sanity/lib/queries/project.query';

export async function generateMetadata() {

    const url = `https://artmarketprint.by/projects`;

    return {
        alternates: {
            canonical: url,
			languages: {
				'ru-BY': url,
				'ru-RU': 'https://artmarketprint.ru/projects/',
				'x-default': url,
			},
        },
    }
}

export default async function ProjectsPage() {
	const data: any = (await getSanityDocuments(HOME_PAGE_PROJECTS_QUERY)) || {};
	const projects = await getSanityDocuments(PROJECTS_QUERY, { limit: 12 });
	const breadcrumbs = (await getSanityDocuments(NAVIGATION_QUERY))[0].links;
	const { title = '', description = '', subtitle } = data?.homePage?.content || {};

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				<Image priority alt={`${siteConfig?.seo?.title}`} className="absolute inset-0 object-cover w-full h-full" height={1080} src="/images/service-2.jpg" width={1920} />
				<div className="container flex flex-col gap-8 max-w-2xl relative z-10 text-center">
					<SectionSubtitle>{subtitle}</SectionSubtitle>
					<div>
						<h1 className="text-4xl font-extrabold text-background sm:text-5xl">{title}</h1>
						<p className="mt-4 text-xl text-white">{description}</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="mt-10 mb-6">
						<BaseBreadcrumb items={breadcrumbs} section='Проекты' />
					</div>
				</div>
			</section>
			<Section innerClassname='pt-6 md:pt-6'>
				<ProjectList bentoGrid={true} projectList={projects} />
			</Section>
			<ContactUs />
		</>
	);
}