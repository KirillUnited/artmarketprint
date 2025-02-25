import Link from 'next/link';
import { Button } from '@heroui/button';
import { SanityDocument } from 'next-sanity';
import { Card, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import clsx from 'clsx';
import { Suspense } from 'react';

import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';

export const ProjectsHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>{subtitle}</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>

		<SectionButton className='hidden lg:flex' href={'/projects'} label="Все проекты" />
	</div>
);

export const ProjectTagList = ({ tags }: { tags: { _id: string; title: string }[] }) => {
	return (
		<ul className='flex flex-wrap gap-2'>
			{
				tags?.map(({ _id, title }: { _id: string; title: string }) => (
					<li key={_id} className='text-tiny text-white/80 bg-primary rounded-small px-1 self-start leading-normal'>{title}</li>
				))
			}
		</ul>
	)
};

export const ProjectCard = ({ project }: { project: SanityDocument }) => (
	<Card isFooterBlurred as={Link} className="h-full group" href={`/projects/${project.currentSlug}`} radius='sm'>
		<Image
			removeWrapper
			alt={project.altText}
			className="z-0 w-full h-full object-cover"
			radius='sm'
			src={project.imageUrl}
		/>
		<CardFooter className="absolute bg-black/40 bottom-0 w-full z-10 max-h-0 overflow-hidden group-hover:max-h-full transition-all duration-700 p-0">
			<div className="flex flex-col gap-4 p-3 w-full">
				{
					project?.service_tags?.length > 0 && (
						<ProjectTagList tags={project.service_tags} />
					)
				}
				{
					project?.category_tags?.length > 0 && (
						<ProjectTagList tags={project.category_tags} />
					)
				}
				<div className="flex flex-col gap-2">
					<h4 className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight">{project.title}</h4>
					<p className="text-xs text-white/80">{project.shortDescription}</p>
				</div>
				<Button as={'div'} color='secondary' role="presentation" radius="sm" size="sm">
					Подробнее
				</Button>
			</div>
		</CardFooter>
	</Card>
);

export const ProjectList = (
	{
		projectList,
		bentoGrid = true,
		className
	}: {
		projectList: SanityDocument[],
		bentoGrid?: boolean,
		className?: string
	}
) => {
	if (projectList.length === 0) return <p className="text-center text-gray-500 mt-4">Пока нет выполненных проектов.</p>

	return (
		<ul className={clsx(
			' gap-8',
			{
				['grid grid-cols-[var(--grid-template-columns)]']: !bentoGrid,
				['flex flex-col md:grid bento-grid-template [--row-height:320px]']: bentoGrid
			},
			className
		)}>
			{projectList.map((project: SanityDocument) => (
				<li key={project.title}>
					<ProjectCard project={project} />
				</li>
			))}
		</ul>
	)
};

export const Projects = async () => {
	const data = await getSanityDocuments(PROJECTS_QUERY, {limit: 3});
	const {subtitle = '', projects = []} = data?.[0] || {};

	if (!data || data.length === 0) {
		console.warn('Нет данных о проектах');

		return null;
	}

	return (
		<Suspense fallback={<p className="text-center text-gray-500">Загрузка проектов...</p>}>
			<Section className="relative" id="projects">
				<ProjectsHeading description={'Портфолио выполненных работ'} subtitle={subtitle} title={'Наши проекты'} />

				{projects && <ProjectList projectList={projects} />}

				<SectionButton className="lg:hidden flex" href={'/projects'} label="Все проекты" />
			</Section>
		</Suspense>
	);
};
