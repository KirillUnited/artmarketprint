import { Suspense } from 'react';

import { ProjectList } from './ProjectList';

import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import clsx from 'clsx';

interface ProjectsProps {
	isActive?: boolean;
	showLastProjects?: boolean;
	title?: string;
	subtitle?: string;
	description?: string;
	link?: { text: string; link: string };
	projects?: any;
	className?: string;
}

export const ProjectsHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>{subtitle}</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>
	</div>
);

export const Projects = async (props: ProjectsProps) => {
	const { subtitle = '', description = '', title = '', link = { text: '', link: '' } } = await props;

	if (!props.isActive) return null;

	const data = props.showLastProjects ? (await getSanityDocuments(PROJECTS_QUERY, { limit: 3 })) : props.projects;

	if (!data || data.length === 0) {
		console.warn('Нет данных о проектах');

		return null;
	}

	return (
		<Suspense fallback={<p className="text-center text-gray-500">Загрузка проектов...</p>}>
			<Section
				className={clsx(
					"relative",
					props.className
				)}
				id="projects"
			>
				<ProjectsHeading description={description} subtitle={subtitle} title={title} />

				{data && <ProjectList projectList={data} />}

				{link?.text && <SectionButton className='self-start' href={link.link} label={link.text} />}
			</Section>
		</Suspense>
	);
};
