import { Suspense } from 'react';

import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import { ProjectList } from './ProjectList';

interface ProjectsProps {
	title?: string;
	subtitle?: string;
	description?: string;
	link?: { text: string; link: string };
	projects?: any;
}

export const ProjectsHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>{subtitle}</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>

		<SectionButton className="hidden lg:flex" href={'/projects'} label="Все проекты" />
	</div>
);

export const Projects = async (props: ProjectsProps) => {
	const data = await getSanityDocuments(PROJECTS_QUERY, { limit: 3 });
	const { subtitle = '', description = '', title = '', link = { text: '', link: '' } } = await props;

	if (!data || data.length === 0) {
		console.warn('Нет данных о проектах');

		return null;
	}
	
	return (
		<Suspense fallback={<p className="text-center text-gray-500">Загрузка проектов...</p>}>
			<Section className="relative" id="projects">
				<ProjectsHeading description={description} subtitle={subtitle} title={title} />

				{data && <ProjectList projectList={data} />}

				{link?.text && <SectionButton className="lg:hidden flex" href={link.link} label={link.text} />}
			</Section>
		</Suspense>
	);
};
