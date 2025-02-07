import Link from 'next/link';
import { Button } from '@heroui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import { SanityDocument } from 'next-sanity';

import { getSanityDocuments } from '@/lib/getData';
import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { Card, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';

const PROJECTS_QUERY = `*[_type == "completedProjects"]{
  title,
  subtitle,
  description,
  projects[]{
    title,
    "currentSlug": slug.current,
    shortDescription,
    "imageUrl": image.asset->url,
    altText,
    tags[]->{
      _id,
      title
    }
  }
}`;

export const ProjectsHeading = ({ title, subtitle, description }: { title?: string; subtitle?: string; description?: string }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>- {subtitle} -</SectionSubtitle>
			<SectionTitle>{title}</SectionTitle>
			<SectionDescription>{description}</SectionDescription>
		</SectionHeading>

		<SectionButton label="Все проекты" href={'/'} className='hidden lg:flex' />
	</div>
);

export const ProjectList = ({ projectList }: { projectList: SanityDocument[] }) => (
	<ul className="flex flex-col md:grid bento-grid-template [--row-height:320px] gap-8">
		{projectList.map((project: SanityDocument) => (
			<li key={project.title}>
				<Card radius='sm' isFooterBlurred as={Link} className="h-full group" href={`/`}>
					<Image
						isZoomed
						removeWrapper
						alt={project.altText}
						className="z-0 w-full h-full object-cover"
						src={project.imageUrl}
						radius='sm'
					/>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-600">
						<div className="flex flex-col gap-4">
							{
								project?.tags?.length > 0 && (
									<ul className='flex flex-wrap gap-2'>
										{
											project.tags.map(({ _id, title }: { _id: string; title: string }) => (
												<span key={_id} className='text-tiny text-white/80 bg-primary rounded-small px-1 self-start leading-normal'>{title}</span>
											))
										}
									</ul>
								)
							}
							<div className="flex flex-col gap-2">
								<h4 className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight">{project.title}</h4>
								<p className="text-xs text-white/80 line-clamp-2">{project.shortDescription}</p>
							</div>
							<Button radius="sm" size="sm" color='secondary'>
								Подробнее
							</Button>
						</div>
					</CardFooter>
				</Card>
			</li>
		))}
	</ul>
);

export const Projects = async () => {
	const data = await getSanityDocuments(PROJECTS_QUERY);
	const { title, subtitle, description, projects } = data?.[0];

	return (
		<Section className="relative" id="projects">
			<ProjectsHeading title={'Наши проекты'} subtitle={subtitle} description={'Портфолио выполненных работ'} />

			{projects && <ProjectList projectList={projects} />}

			<SectionButton label="Все проекты" href={'/'} className='lg:hidden flex' />
		</Section>
	);
};
